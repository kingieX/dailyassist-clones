import PrivacyHeroSection from "../../components/sections/privacy/PrivacyHeroSection";
import PrivacyDetailTemplate from "../../components/sections/privacy/PrivacyDetailTemplate";

export default function PrivacyPage2() {
  return (
    <main>
      <PrivacyHeroSection />
      <PrivacyDetailTemplate title="Data Protection Policy">

        <h2 className="text-lg font-semibold text-[#111827] mt-6">1. Purpose of This Policy</h2>
        <p>Daily Assist UK is committed to protecting all personal data handled as part of our home-help, companionship, errands, transport and support services. This policy explains how we collect, store, use, share and protect personal information in a way that complies with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
        <p>All staff, contractors, and volunteers must always follow this policy.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">2. Scope</h2>
        <p>This policy applies to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>All personal data relating to clients</li>
          <li>All personal data relating to staff and job applicants</li>
          <li>Any data stored electronically, in paper form, or shared verbally</li>
          <li>All systems, devices and platforms used for business purposes</li>
        </ul>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">3. Definitions</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Personal Data:</strong> Any information that identifies an individual (e.g., name, address, phone number)</li>
          <li><strong>Special Category Data:</strong> More sensitive information (e.g., health details, disabilities)</li>
          <li><strong>Processing:</strong> Any action involving data — collecting, storing, editing, sharing, or deleting</li>
          <li><strong>Data Subject:</strong> The individual whose data is being processed</li>
          <li><strong>Data Controller:</strong> Daily Assist UK — responsible for deciding why and how data is processed</li>
          <li><strong>Data Protection Officer (DPO):</strong> Not legally required, but a nominated person within the company who will oversee compliance</li>
        </ul>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">4. Principles of Data Protection</h2>
        <p>Daily Assist UK processes personal data in line with the six core principles of UK GDPR. Data must be:</p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Lawful, fair and transparent</li>
          <li>Collected for specific, legitimate purposes</li>
          <li>Adequate, relevant and limited to what is needed</li>
          <li>Accurate and kept up to date</li>
          <li>Stored only as long as necessary</li>
          <li>Handled securely</li>
        </ol>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">5. Legal Basis for Processing Data</h2>
        <p>Daily Assist UK processes data under these lawful bases:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Consent:</strong> When clients give us clear permission</li>
          <li><strong>Contract:</strong> We need the data to deliver agreed services</li>
          <li><strong>Legal obligation:</strong> Employment law, record keeping, insurance, safeguarding</li>
          <li><strong>Legitimate interests:</strong> Efficient operations, scheduling, staff management</li>
        </ul>
        <p>For <strong>special category data</strong> (e.g., health needs relevant to service delivery), processing is based on:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Explicit consent</li>
          <li>The necessity to provide safe, non-medical support</li>
          <li>Safeguarding purposes</li>
        </ul>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">6. What Data We Collect</h2>
        <h3 className="text-base font-semibold text-[#111827] mt-4">Client data</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Name, address, phone number, email</li>
          <li>Key safe codes (if used)</li>
          <li>Emergency contacts</li>
          <li>Relevant health or mobility information (limited to what is needed for safe service delivery)</li>
          <li>Visit logs</li>
          <li>Risk assessments</li>
          <li>Payment information</li>
        </ul>
        <h3 className="text-base font-semibold text-[#111827] mt-4">Staff data</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Identification and right-to-work documents</li>
          <li>Contact details</li>
          <li>DBS checks</li>
          <li>Training records</li>
          <li>Employment history</li>
          <li>Vehicle and insurance details (if using personal cars for work)</li>
        </ul>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">7. How We Use Personal Data</h2>
        <p>Personal data is used to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Deliver home-help and support services safely</li>
          <li>Maintain accurate schedules and visit logs</li>
          <li>Communicate with clients and staff</li>
          <li>Handle emergencies</li>
          <li>Manage staff employment</li>
          <li>Ensure safeguarding and risk management</li>
          <li>Process payments and invoices</li>
          <li>Meet legal and insurance obligations</li>
        </ul>
        <p>Daily Assist UK does <strong>not</strong> sell personal data or share it for marketing purposes.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">8. Data Sharing</h2>
        <p>We may share personal data with:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Emergency services (if needed)</li>
          <li>Client-approved family or representatives</li>
          <li>Regulatory or legal bodies (if required)</li>
          <li>Payroll, HR or insurance providers</li>
          <li>Our nominated staff, on a need-to-know basis only</li>
        </ul>
        <p>All third parties must comply with GDPR. We do <strong>not</strong> share information without lawful basis and documented reason.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">9. Data Storage & Security</h2>
        <p>Daily Assist UK protects personal data using:</p>
        <h3 className="text-base font-semibold text-[#111827] mt-4">Digital security</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Password-protected devices</li>
          <li>Encrypted storage</li>
          <li>Secure cloud systems</li>
          <li>Restricted access levels</li>
          <li>No personal data stored on personal devices without authorisation</li>
        </ul>
        <h3 className="text-base font-semibold text-[#111827] mt-4">Physical</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Locked cabinets</li>
          <li>Restricted access</li>
          <li>Secure shredding of old files</li>
        </ul>
        <h3 className="text-base font-semibold text-[#111827] mt-4">Staff responsibilities</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Never leaving devices unattended</li>
          <li>Never sharing login details</li>
          <li>Reporting data breaches immediately</li>
        </ul>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">10. Data Retention Periods</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Client records:</strong> 6 years after last service</li>
          <li><strong>Visit logs:</strong> 3 years</li>
          <li><strong>Incident reports:</strong> 4 years</li>
          <li><strong>Staff employment files:</strong> 6 years after employment ends</li>
          <li><strong>DBS copies:</strong> Not stored; only confirmation record retained</li>
          <li><strong>Financial records:</strong> 6 years (HMRC requirement)</li>
        </ul>
        <p>Data no longer needed is securely deleted or shredded.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">11. Data Breach Procedure</h2>
        <p>A data breach includes loss, theft, unauthorised access, accidental disclosure, or cyber-attack.</p>
        <p>Steps:</p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Staff must report any breach immediately to management</li>
          <li>Daily Assist UK will investigate the breach</li>
          <li>If risk to individuals exists, Daily Assist UK will notify the ICO within 72 hours</li>
          <li>Affected individuals will be informed if necessary</li>
          <li>Action will be taken to prevent recurrence</li>
        </ol>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">12. Client Rights Under UK GDPR</h2>
        <p>Clients may:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access their data</li>
          <li>Request corrections</li>
          <li>Request deletion (where lawful)</li>
          <li>Restrict processing</li>
          <li>Object to certain uses</li>
          <li>Request a copy of their data</li>
        </ul>
        <p>Daily Assist UK will respond within <strong>30 days</strong>.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">13. Staff Responsibilities</h2>
        <p>All staff must:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Read and sign the Confidentiality Agreement</li>
          <li>Follow GDPR procedures</li>
          <li>Only access data necessary for their role</li>
          <li>Never share data or passwords/emails</li>
          <li>Complete GDPR training</li>
          <li>Report breaches without delay</li>
        </ul>
        <p>Failure to comply may lead to disciplinary action.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">14. Policy Review</h2>
        <p>This policy is reviewed <strong>annually</strong> or sooner if regulations change.</p>
        <p><strong>Approved by: Daily Assist UK Management.</strong></p>

      </PrivacyDetailTemplate>
    </main>
  );
}