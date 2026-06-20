# Backend / Frontend Contract Audit

## Confirmation of understanding

Yes: the goal is **not** to change the frontend. The frontend is the source of truth for this audit. The work is to inspect how frontend screens, forms, dashboard tables, CRUD flows, visit actions, staff/client/booking/message/report/package/recruitment/job-post pages expect to create, render, update, and delete data, then compare those expectations to the backend endpoints, request bodies, response shapes, and omitted APIs.

This document is a planning/audit artifact only. It does **not** implement backend changes. Any backend implementation should wait for approval.

## How to read this audit

- **Frontend expectation** means the route, verb, payload, and render shape implied by current frontend service wrappers and active components.
- **Backend current contract** means the route, verb, payload, and response shape currently implemented by Express routes/validation/services.
- **Gap** means a place where the frontend would fail to create, render, update, delete, or act on data without backend compatibility work.
- **Backend recommendation** means a backend-only change that would let the existing frontend continue unchanged.

## Global contract observations

1. Backend routes are mounted under `/api/v1`; frontend route fragments assume `VITE_API_BASE_URL` already includes the API prefix.
2. Backend success responses use an envelope shaped like `{ success, message, data }`.
3. Many backend list endpoints return `{ items, pagination }` inside `data`, but several active frontend screens extract `response.data?.data` and then require it to be an array. That means the frontend will render empty lists unless the backend returns arrays directly or compatibility response fields are added.
4. The frontend contains a mixture of active live API calls and dashboard pages still using local mock data. Backend work should prioritize active API usage first, but should also prepare endpoints for pages that are clearly intended to become live.
5. Several frontend forms send `FormData` with files. The backend mostly validates JSON bodies and URL fields, so file-upload normalization is a major backend gap.

## Feature-by-feature audit

### 1. Authentication and current user

#### Frontend expectation

- Admin login calls `POST /auth/admin/login` with `{ email, password }`.
- Frontend service defines worker login as `POST /auth/worker/login` with `{ email, password }`.
- Frontend service defines logout as `POST /auth/logout` with no body.
- Frontend service defines refresh as `POST /auth/refresh` with no body.
- Worker dashboard calls `GET /auth/me` and expects a user object with fields it can map into worker profile display.

#### Backend current contract

- `POST /auth/admin/login` exists.
- `POST /auth/staff/login` exists, not `/auth/worker/login`.
- `POST /auth/logout` and `POST /auth/refresh` validate a refresh-token body.
- `GET /auth/me` exists.

#### Gaps

- Worker login route name does not match frontend service.
- Logout/refresh can fail validation because frontend sends no body.
- Staff login page active code currently attempts admin login; if worker login is activated through the existing service, backend still needs `/auth/worker/login` compatibility.

#### Backend recommendation

- Add `POST /api/v1/auth/worker/login` as an alias to the staff login controller.
- Allow refresh/logout to read the httpOnly refresh cookie if no body refresh token is sent.
- Ensure `GET /auth/me` returns enough user/profile fields for the worker dashboard, ideally including staff profile fields such as first name, last name, phone, DOB, gender/sex, zone, staff code, role, and email.

---

### 2. Admin dashboard summary, charts, alerts, recent visits, staff schedule, reports

#### Frontend expectation

- Calls:
  - `GET /admin/dashboard/summary`
  - `GET /admin/dashboard/alerts`
  - `GET /admin/dashboard/charts`
  - `GET /admin/visits?page=1&limit=20`
  - `GET /admin/staff`
  - `GET /admin/reports?page=1&limit=10`
- Active dashboard code unwraps `response.data?.data ?? response.data`.
- For visits, staff, and reports, active dashboard then checks `Array.isArray(data)` and otherwise renders `[]`.

#### Backend current contract

- Dashboard summary/charts/alerts exist and return envelope `data` objects.
- Admin visits returns paginated `{ items, pagination }`.
- Admin staff returns paginated `{ items, pagination }`.
- Admin reports returns paginated `{ items, pagination }`.

#### Gaps

- Dashboard summary/charts/alerts are broadly aligned.
- Visit/staff/report dashboard sections may render empty because frontend expects arrays while backend returns paginated objects.

#### Backend recommendation

- Preserve paginated shape for API quality, but add compatibility fields to list responses, for example `data: { items, pagination, records: items }`, only if frontend can be adapted later. Since frontend currently requires arrays, the backend may need endpoint-specific compatibility mode or top-level arrays for these routes.
- Safer backend-only compatibility: return `data` as an array and include pagination in a sibling field such as `meta.pagination` for endpoints consumed directly by the current frontend. This is a contract decision to approve before implementation.

---

### 3. Staff management

#### Frontend expectation

- API wrapper:
  - `GET /admin/staff`
  - `GET /admin/staff/:id`
  - `POST /admin/staff`
  - `PUT /admin/staff/:id`
  - `DELETE /admin/staff/:id`
- Add Staff sends multipart `FormData` fields:
  - `firstName`, `lastName`, `email`, `phone`, `role`, `dob`, `sex`, `zone`, `vehicle`, `photo`, `cv`
- Edit Staff sends a similar frontend-shaped payload and uses `PUT`.
- Staff management list/detail screens expect staff records suitable for cards/tables, including names, email, phone, status, role/staff role, zone, vehicle, photo/CV references, and IDs.

#### Backend current contract

- Routes exist for `GET/POST/GET/:id/DELETE` under `/admin/staff`.
- Update is `PATCH /admin/staff/:id`, not `PUT`.
- Create validates JSON, requires `password`, and expects fields such as `dateOfBirth`, `ownsCar`, `photoUrl`, `cvFileUrl`, and `staffRoleLabel`.
- No staff create/update upload middleware is currently attached.

#### Gaps

- Frontend create lacks required backend `password`.
- Frontend sends multipart files; backend expects URLs in JSON.
- Frontend field names differ: `dob` vs `dateOfBirth`, `vehicle` vs `ownsCar`, `role` vs `staffRoleLabel`.
- Frontend update uses `PUT`; backend only has `PATCH`.
- List response pagination may not render if frontend expects an array.

#### Backend recommendation

- Add `PUT /api/v1/admin/staff/:id` as an alias to update staff.
- Add multipart middleware for staff create/update, storing `photo` and `cv`, then map to `photoUrl` and `cvFileUrl`.
- Normalize fields before validation: `dob -> dateOfBirth`, `vehicle -> ownsCar`, `role -> staffRoleLabel`.
- Decide password strategy: backend should either auto-generate/provision a temporary password on staff create or expose a backend-compatible default provisioning flow because frontend does not submit a password.
- Return staff list/details in a frontend-friendly shape while retaining nested profile details where needed.

---

### 4. Client management

#### Frontend expectation

- API wrapper:
  - `GET /clients`
  - `GET /clients/:id`
  - `POST /clients`
  - `PUT /clients/:id`
  - `DELETE /clients/:id`
- Add Client sends multipart `FormData` fields:
  - `title`, `firstName`, `lastName`, `email`, `phone`, `age`, `sex`, `address`, `emergencyContactName`, `emergencyContactPhone`, `emergencyContactRelationship`, `note`, `proofOfAddress`
- Edit Client sends fields the UI edits and uses `PUT`.
- Client pages need list, details, history, delete, and update behavior.

#### Backend current contract

- Admin client routes exist under `/admin/clients`, not `/clients`.
- Update is `PATCH`, not `PUT`.
- Backend validates JSON and expects `proofOfAddressUrl`, not file field `proofOfAddress`.
- Backend field is `notes`, not `note`.

#### Gaps

- Frontend path will 404 unless proxied/aliased.
- Frontend update method will 404/405 because backend lacks `PUT`.
- Multipart proof-of-address uploads are not handled.
- `note` may be ignored or rejected depending validation behavior.
- List response shape may not match array rendering.

#### Backend recommendation

- Add protected `/api/v1/clients` aliases to admin client handlers.
- Add `PUT /api/v1/clients/:id` and optionally `PUT /api/v1/admin/clients/:id` aliases to the update handler.
- Add upload support for `proofOfAddress`, map stored file to `proofOfAddressUrl`.
- Normalize `note -> notes` before validation.
- Ensure list/detail responses flatten or include fields required by client cards/details/history screens.

---

### 5. Bookings

#### Frontend expectation

- API wrapper:
  - `GET /admin/bookings`
  - `GET /admin/bookings/:id`
  - `PATCH /admin/bookings/:id`
  - `POST /admin/bookings/:id/assign`
  - `POST /admin/bookings/:id/cancel`
  - `POST /admin/bookings/:id/complete`
- Current BookingsPage active code appears to use local mock data, but older/commented code indicates intended backend list integration.
- Booking UI needs data to render client, package/service, preferred date/time, status, assigned staff, and booking details.

#### Backend current contract

- Admin booking routes largely match the frontend wrapper.
- List responses are paginated `{ items, pagination }`.
- Assign/cancel/complete exist.

#### Gaps

- If BookingsPage is reconnected as currently commented, it may expect an array and not `{ items, pagination }`.
- Need verify whether frontend status labels and backend enum statuses match once live data replaces mock data.
- Booking update body supports scheduling/contact fields but may not cover all detail edits if future frontend enables them.

#### Backend recommendation

- Keep existing booking endpoints.
- Add response compatibility for list rendering if needed.
- Audit frontend mock booking fields and ensure backend booking include/select returns equivalent display fields.

---

### 6. Admin visits

#### Frontend expectation

- Admin visits service calls:
  - `GET /admin/visits`
  - `GET /admin/visits/:id`
  - `POST /admin/visits`
  - `PATCH /admin/visits/:id`
  - `POST /admin/visits/:id/reassign`
  - `POST /admin/visits/:id/cancel`
- Admin VisitsSection loads staff and visits together.
- Admin Visit creation/assignment modals need staff IDs, booking IDs, scheduled start/end, notes, and rendered visit details.

#### Backend current contract

- Admin visit routes match the wrapper.
- Create expects `{ bookingId, staffId, scheduledStartAt, scheduledEndAt, adminNotes }`.
- Update accepts schedule/note fields, not status changes.
- List response is paginated `{ items, pagination }`.

#### Gaps

- List response may not render if the active component expects an array.
- Need verify frontend modals produce exact date/time fields as `scheduledStartAt` and `scheduledEndAt`; if they send separate date/time or non-ISO strings, backend normalization will be needed.

#### Backend recommendation

- Preserve admin visit lifecycle endpoints.
- Add backend normalization for date/time fields only if frontend modals submit separate date/time values.
- Make list response frontend-compatible or add compatibility endpoint fields.

---

### 7. Worker dashboard and worker visits

#### Frontend expectation

- Worker dashboard currently imports the shared `visitsAPI` and calls `visitsAPI.getAll()`, which points to `GET /admin/visits`.
- Worker visit card check-in calls `visitsAPI.update(visit.id, { status: "in-progress" })`.
- Worker visit card check-out calls `visitsAPI.update(visit.id, { status: "completed" })`.
- Worker UI status strings are lowercase/hyphenated, e.g. `in-progress`, while backend uses enum values like `IN_PROGRESS`.
- Worker dashboard needs today/upcoming visits, visit history, visit details, check-in, check-out, and visit logs.

#### Backend current contract

- Correct staff routes exist under `/staff/visits`:
  - `GET /staff/visits/today`
  - `GET /staff/visits/history`
  - `GET /staff/visits/:id`
  - `POST /staff/visits/:id/acknowledge`
  - `POST /staff/visits/:id/check-in`
  - `POST /staff/visits/:id/check-out`
- Admin `/admin/visits` routes require admin roles and do not accept status in update body.

#### Gaps

- Worker frontend currently calls admin visit endpoints, which staff users should not be authorized to access.
- Backend does not support `PATCH /admin/visits/:id` status changes, and should not for worker actions.
- Lowercase/hyphen status strings do not match backend enums.
- Staff route response shape may not match the worker cards because frontend currently consumes a generic visit array.

#### Backend recommendation

- Do **not** weaken admin visit authorization.
- Add backend compatibility only after approval, likely one of:
  1. Add neutral `/api/v1/visits` staff/admin-aware routes, then later frontend can point there; or
  2. Add `PATCH /api/v1/staff/visits/:id` accepting frontend status strings and mapping to check-in/check-out, while preserving explicit action endpoints.
- Because the current frontend path is `/admin/visits`, fully backend-only compatibility would be risky unless route middleware branches by role. This needs explicit approval.

---

### 8. Messages, announcements, and notifications

#### Frontend expectation

- API wrapper exposes:
  - `GET /messages`
  - `POST /messages`
- Commented messages page code suggests generic send payloads like `{ recipient, message }` or `{ conversationId, message }`.
- Admin dashboard action includes Send Announcement navigation.
- Message pages need conversations, message lists, send message, announcements, and possibly notification history/preferences.

#### Backend current contract

- Backend has thread-based routes:
  - `/admin/messages/threads`
  - `/admin/messages/threads/:id/messages`
  - `/staff/messages/threads`
  - `/staff/messages/threads/:id/messages`
- Backend has announcements and notifications under admin/staff route groups.
- No generic `/messages` route exists.

#### Gaps

- Generic frontend `/messages` calls will 404 if activated.
- Payload shape differs from backend thread create/post message schemas.
- Announcement UI and backend announcement routes need payload comparison before activation.

#### Backend recommendation

- Add role-aware compatibility routes for `GET /api/v1/messages` and `POST /api/v1/messages` only if existing frontend messages code will be used unchanged.
- Alternatively expose frontend-friendly aggregate endpoints that wrap thread, messages, participants, and latest-message data.
- Verify `SendAnnouncementPage` payload against `POST /admin/announcements` before implementation.

---

### 9. Reports

#### Frontend expectation

- API wrapper:
  - `GET /admin/reports`
  - `POST /admin/reports`
  - `PUT /admin/reports/:id`
  - `DELETE /admin/reports/:id`
- Commented report page code indicates update payload such as `{ status: reportStatus, reasonForAction: reason }`.
- Reports page needs listing, status/action updates, delete, and table/detail rendering.

#### Backend current contract

- Backend has:
  - `POST /admin/reports`
  - `GET /admin/reports`
  - `GET /admin/reports/:id`
  - `PATCH /admin/reports/:id/status`
  - `DELETE /admin/reports/:id`
- List is paginated.

#### Gaps

- `PUT /admin/reports/:id` does not exist.
- Frontend `reasonForAction` may not match backend validation field names.
- List response shape may not render if array is expected.

#### Backend recommendation

- Add `PUT /api/v1/admin/reports/:id` compatibility route that maps frontend payload to report status update.
- Normalize `reasonForAction` to backend notes/reason field.
- Return report records with fields expected by report table/cards.

---

### 10. Packages

#### Frontend expectation

- API wrapper:
  - `GET /packages`
  - `GET /packages/:id`
  - `POST /packages`
  - `PUT /packages/:id`
  - `DELETE /packages/:id`
- Create/Edit package modals send fields such as:
  - `icon`, `name`, `price`, `duration`, `tagline`, `features`, `additionalCharge`
- Package admin page needs list, create, edit, delete, and render package cards.

#### Backend current contract

- Public routes expose:
  - `GET /public/packages`
  - `GET /public/packages/:slug`
- No admin package CRUD route was found.
- Route lookup is by slug publicly, while frontend wrapper uses `id`.

#### Gaps

- All admin package CRUD calls will 404.
- `/packages` frontend path is not mounted.
- Create/update payload is not validated by existing backend route.
- Public slug route does not satisfy admin edit/delete by ID.

#### Backend recommendation

- Add protected package CRUD endpoints matching frontend paths and payloads.
- Decide whether `/api/v1/packages` should be protected for mutations and public for reads, or whether admin CRUD should live at `/api/v1/admin/packages` plus compatibility aliases.
- Support both ID and slug lookup if existing frontend uses IDs and public pages use slugs.

---

### 11. Recruitment / worker applications

#### Frontend expectation

- API wrapper:
  - `GET /recruitment`
  - `GET /recruitment/:id`
  - `POST /recruitment`
  - `PUT /recruitment/:id`
  - `DELETE /recruitment/:id`
- Recruitment page needs applicant list, applicant detail/status changes, delete, and possibly conversion/hiring actions.
- Public Apply Job form collects applicant details and CV file in the UI.

#### Backend current contract

- Admin recruitment routes are:
  - `GET /admin/recruitment/applications`
  - `GET /admin/recruitment/applications/:id`
  - `PATCH /admin/recruitment/applications/:id/status`
  - `POST /admin/recruitment/applications/:id/convert-to-staff`
- Public worker application route exists:
  - `POST /public/worker-applications`
- Public route uses upload middleware for CV, but the visible Apply Job page needs wiring/contract confirmation.

#### Gaps

- `/recruitment` CRUD wrapper does not match backend admin application paths.
- `PUT /recruitment/:id` and `DELETE /recruitment/:id` are not present.
- Applicant creation from admin `/recruitment` is not present; public application route is separate.
- Need compare public Apply Job form field names and file field name to backend upload middleware.

#### Backend recommendation

- Add `/api/v1/recruitment` protected aliases for list/detail/status/delete if frontend recruitment page will be used unchanged.
- Add delete/archive application endpoint if deletion is expected.
- Confirm public Apply Job form field/file names and normalize backend worker application handling accordingly.

---

### 12. Job posts

#### Frontend expectation

- API wrapper:
  - `GET /job-posts`
  - `GET /job-posts/:id`
  - `POST /job-posts`
  - `PUT /job-posts/:id`
  - `DELETE /job-posts/:id`
- JobPosts page needs create, edit, list, delete, publish/status-like behavior depending form fields.

#### Backend current contract

- No job-post route was found.
- No obvious job-post CRUD API currently exists.

#### Gaps

- All job-post CRUD calls will 404 if activated.
- Backend schema/model may be missing, not just routes.

#### Backend recommendation

- Add a job-post model and protected CRUD endpoints matching frontend payloads after confirming exact JobPosts form fields.
- Optionally expose public active job posts separately for Careers/Current Vacancies rendering.

---

### 13. Public booking, consultation, and service/package catalog

#### Frontend expectation

- Public package/service pages need catalog reads.
- Booking form likely needs package/service selections, client details, preferred days/time/start date, emergency contact, consent flags, and optional notes.
- Contact/consultation form likely needs name, email, phone, subject, and message.
- Public forms should not require frontend code changes in this backend-first phase.

#### Backend current contract

- `GET /public/packages`, `GET /public/packages/:slug`, and `GET /public/services` exist.
- `POST /public/consultations` validates name/email/phone/subject/message and requires captcha.
- `POST /public/bookings` validates booking fields and requires captcha.
- `POST /public/worker-applications` exists with rate limit, captcha, and CV upload middleware.

#### Gaps

- Existing frontend API service does not expose public helper methods, so active frontend integration may be missing or elsewhere.
- Captcha requirement may reject current forms if no captcha token is submitted.
- Need inspect exact public form submit code before implementing compatibility.

#### Backend recommendation

- Confirm the frontend public forms' exact field names and captcha behavior.
- Add backend aliases/normalization for public form field names only after approval.
- Ensure public catalog responses include fields needed by package/service cards.

## Prioritized backend-only remediation plan after approval

1. **Response-shape compatibility:** Decide how list endpoints should satisfy current frontend `Array.isArray(...)` rendering while preserving pagination metadata.
2. **Route/method aliases:** Add safe aliases for `/clients`, `PUT` updates, `/auth/worker/login`, `/messages`, `/packages`, `/recruitment`, and `/job-posts` where approved.
3. **Multipart support:** Add backend upload/normalization for staff, clients, and worker applications based on frontend file field names.
4. **Payload normalization:** Map frontend field names to backend field names, including `dob`, `vehicle`, `role`, `note`, `reasonForAction`, and lowercase visit statuses.
5. **Missing resource APIs:** Implement package CRUD and job-post CRUD if confirmed in scope.
6. **Worker visit compatibility:** Resolve worker visit actions carefully without weakening admin routes.
7. **Contract tests:** Add backend tests that use the frontend's current route, verb, request body, and expected render response shape.

## Questions to approve before implementation

1. Should list endpoints return arrays directly for current frontend compatibility, or should backend add a compatibility wrapper while preserving `{ items, pagination }`?
2. Should staff creation auto-generate a temporary password because the frontend Add Staff form does not submit one?
3. Should `/clients`, `/packages`, `/messages`, `/recruitment`, and `/job-posts` be top-level protected routes, aliases to admin routes, or split public/admin by HTTP method?
4. Should backend support worker visit updates from the current frontend path `/admin/visits`, or should we avoid that because it weakens admin route semantics?
5. Should package and job-post CRUD be fully implemented in the database now, or should backend add temporary compatibility endpoints first?
6. What storage target should be used for uploaded proof-of-address, staff photos, staff CVs, and applicant CVs: local `/uploads` or external storage?
