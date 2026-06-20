export default function TermsContentSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-gray-700">
        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
          Terms & Conditions of Service
        </h1>

        <p className="text-sm md:text-xl text-black-600 leading-relaxed mb-10">
          These Terms & Conditions ("Terms") apply to all services provided by
          Daily Assist UK. By booking or using our services, clients agree to be
          bound by these Terms.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-gray-800 mb-3">
            1. About Us
          </h2>
          <p className="text-sm md:text-xl text-gray-600 leading-relaxed mb-3">
            <span className="font-bold text-gray-800">Daily Assist UK</span>{" "}
            provides non-medical home-help and community support services,
            including household assistance, errands, welfare check-ins,
            companionship, transport support, and light domestic tasks.
          </p>
          <p className="text-sm md:text-xl text-gray-600 leading-relaxed">
            We do <span className="font-bold text-gray-800">not</span> provide
            regulated personal care, medical care, or clinical services.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-[#2b2b2b] mb-3">
            2. Services Provided
          </h2>
          <p className="text-sm md:text-xl text-gray-600 leading-relaxed mb-3">
            Daily Assist UK offers support services including (but not limited
            to):
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-xl text-gray-600 mb-3 pl-2">
            <li>Home-help (cleaning, laundry, light meal preparation)</li>
            <li>Errands and shopping support</li>
            <li>Welfare check-ins and companionship</li>
            <li>Transport and appointment escort (non-medical)</li>
            <li>Light gardening and household tasks</li>
            <li>Pet care support</li>
          </ul>
          <p className="text-sm md:text-xl text-gray-500 italic leading-relaxed">
            Services are tailored to individual needs and agreed in advance.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-gray-800 mb-3">
            3. What We Do Not Provide
          </h2>
          <p className="text-sm md:text-xl text-gray-600 leading-relaxed mb-3">
            Daily Assist UK staff must not:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-xl text-gray-600 mb-3 pl-2">
            <li>Provide personal or intimate care</li>
            <li>Administer medication</li>
            <li>Provide medical or nursing care</li>
            <li>Handle finances beyond agreed shopping support</li>
            <li>Provide legal or financial advice</li>
          </ul>
          <p className="text-sm md:text-xl text-gray-500 italic leading-relaxed">
            If a task falls outside our scope, we will advise the client and
            help sign post appropriate services.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-[#2b2b2b] mb-3">
            4. Booking & Service Agreements
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-xl text-gray-600 pl-2">
            <li>All services must be booked in advance.</li>
            <li>
              Regular services may be provided via weekly packages or agreed
              schedules.
            </li>
            <li>One-off services are subject to availability.</li>
            <li>
              A service agreement or confirmation will be provided before
              services begin.
            </li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-gray-800 mb-3">
            5. Payment Terms
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-xl text-gray-600 pl-2">
            <li>
              Payments are required in accordance with our{" "}
              <span className="font-bold text-gray-800">Payment Policy</span>.
            </li>
            <li>
              Weekly packages are paid{" "}
              <span className="font-bold text-gray-800">in advance</span> via
              Direct Debit (GoCardless preferred).
            </li>
            <li>
              Hourly or one-off services must be paid within the stated invoice
              timeframe.
            </li>
            <li>Services may be paused if payments remain outstanding.</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-[#2b2b2b] mb-3">
            6. Cancellations & Missed Visits
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-xl text-gray-600 pl-2">
            <li>
              Cancellations with less than{" "}
              <span className="font-bold text-gray-800">24 hours' notice</span>{" "}
              may be charged at{" "}
              <span className="font-bold text-gray-800">50%</span> of the visit
              cost.
            </li>
            <li>
              Same-day cancellations (within 6 hours) may be charged at{" "}
              <span className="font-bold text-gray-800">100%</span>.
            </li>
            <li>
              If Daily Assist UK cancels a visit, no charge will apply and
              alternatives will be offered.
            </li>
          </ul>
        </div>

        {/* Section 7 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-gray-800 mb-3">
            7. Access to Property
          </h2>
          <p className="text-sm md:text-xl text-gray-500 italic leading-relaxed mb-3">
            Clients must ensure safe and reasonable access to their property,
            including:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-xl text-gray-600 mb-3 pl-2">
            <li>Accurate address details</li>
            <li>Working entry systems or key safes where agreed</li>
            <li>Safe, hazard-free environments</li>
          </ul>
          <p className="text-sm md:text-xl text-gray-500 italic leading-relaxed">
            Daily Assist UK reserves the right to refuse or end a visit if staff
            safety is at risk.
          </p>
        </div>

        {/* Section 8 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-[#2b2b2b] mb-3">
            8. Transport & Mileage
          </h2>
          <p className="text-sm md:text-xl text-gray-500 italic leading-relaxed mb-3">
            Where transport support is provided:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xl md:text-xl text-gray-600 pl-2">
            <li>
              Staff may use their own vehicles with appropriate business
              insurance
            </li>
            <li>
              Mileage may be charged at{" "}
              <span className="font-bold text-gray-800">
                HMRC standard rates (currently £0.45 per mile)
              </span>
            </li>
            <li>
              Transport support is non-medical and does not replace ambulance or
              patient transport services
            </li>
          </ul>
        </div>

        {/* Section 9 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-[#2b2b2b] mb-3">
            9. Safeguarding
          </h2>
          <p className="text-sm md:text-xl text-gray-500 italic leading-relaxed mb-3">
            Daily Assist UK is committed to safeguarding adults at risk.
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-xl text-gray-600 pl-2">
            <li>
              Any safeguarding concerns will be reported in line with our
              Safeguarding Policy
            </li>
            <li>
              Confidential information may be shared with relevant authorities
              where legally required
            </li>
          </ul>
        </div>

        {/* Section 10 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-[#2b2b2b] mb-3">
            10. Data Protection & Confidentiality
          </h2>
          <p className="text-sm md:text-xl text-gray-500 italic leading-relaxed mb-3">
            We comply fully with the UK GDPR and Data Protection Act 2018.
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-xl text-gray-600 pl-2">
            <li>Client information is stored securely</li>
            <li>Data is only shared where necessary and lawful</li>
            <li>
              Full details are available in our{" "}
              <span className="font-bold text-gray-800">
                Privacy & Data Protection Policy
              </span>
            </li>
          </ul>
        </div>

        {/* Section 11 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-[#2b2b2b] mb-3">
            11. Complaints
          </h2>
          <p className="text-sm md:text-xl text-gray-500 italic leading-relaxed mb-3">
            Clients have the right to raise concerns or complaints.
          </p>
          <ul className="list-disc list-inside space-y-1 text-xl md:text-xl text-gray-600 pl-2">
            <li>
              Complaints should be submitted in line with our{" "}
              <span className="font-bold text-gray-800">
                Complaints Procedure
              </span>
            </li>
            <li>We aim to respond fairly, promptly, and transparently</li>
          </ul>
        </div>

        {/* Section 12 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-gray-800 mb-3">
            12. Limitation of Liability
          </h2>
          <p className="text-sm md:text-xl text-gray-500 italic leading-relaxed mb-3">
            Daily Assist UK will take reasonable care when providing services.
          </p>
          <p className="text-sm md:text-xl text-gray-600 leading-relaxed mb-3">
            However, we are not liable for:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-xl text-gray-600 mb-3 pl-2">
            <li>Losses caused by inaccurate client information</li>
            <li>Pre-existing damage or unsafe home conditions</li>
            <li>Losses outside our reasonable control</li>
          </ul>
          <p className="text-sm md:text-xl text-gray-500 italic leading-relaxed">
            Nothing in these Terms limits liability where it cannot legally be
            excluded.
          </p>
        </div>

        {/* Section 13 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-[#2b2b2b] mb-3">
            13. Right to Refuse or Withdraw Services
          </h2>
          <p className="text-sm md:text-xl text-gray-500 italic leading-relaxed mb-3">
            Daily Assist UK reserves the right to refuse or withdraw services
            if:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-xl text-gray-600 pl-2">
            <li>Staff safety is at risk</li>
            <li>There is abusive, discriminatory, or threatening behaviour</li>
            <li>Payment terms are breached</li>
            <li>Services fall outside our agreed scope</li>
          </ul>
        </div>

        {/* Section 14 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-gray-800 mb-3">
            14. Changes to Services or Terms
          </h2>
          <p className="text-sm md:text-xl text-gray-600 leading-relaxed">
            We may update services, prices, or these Terms with reasonable
            notice.
            <br />
            The most recent version will always be available on our website.
          </p>
        </div>

        {/* Section 15 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-gray-800 mb-3">
            15. Governing Law
          </h2>
          <p className="text-sm md:text-xl text-gray-600 leading-relaxed">
            These Terms are governed by the laws of{" "}
            <span className="font-bold text-gray-800">England and Wales</span>.
            <br />
            Any disputes will be handled by the courts of England and Wales.
          </p>
        </div>

        {/* Section 16 */}
        <div className="mb-8">
          <h2 className="text-base md:text-2xl font-bold text-[#2b2b2b] mb-3">
            16. Contact Information
          </h2>
          <p className="text-sm md:text-xl text-gray-600 leading-relaxed mb-3">
            Daily Assist UK:
          </p>
          <div className="pl-4 flex flex-col gap-2 text-sm md:text-xl text-gray-600">
            <p>
              <span className="font-medium text-gray-700">Email:</span>{" "}
              <a
                href="mailto:Info@dailyassistuk.com"
                className="text-[#2b2b2b] hover:underline"
              >
                Info@dailyassistuk.com
              </a>
            </p>
            <p>
              <span className="font-medium text-gray-700">Phone:</span>{" "}
              <a
                href="tel:01268904508"
                className="text-[#2b2b2b] hover:underline"
              >
                01268 904 508
              </a>
            </p>
            <p>
              <span className="font-medium text-gray-700">Website:</span>{" "}
              <a
                href="https://www.dailyassistuk.com"
                className="text-[#2b2b2b] hover:underline"
              >
                www.dailyassistuk.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
