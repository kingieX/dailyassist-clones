
import PrivacyHeroSection from "../../components/sections/privacy/PrivacyHeroSection";
import PrivacyDetailTemplate from "../../components/sections/privacy/PrivacyDetailTemplate";

export default function PrivacyPage1() {
  return (
    <main>
      <PrivacyHeroSection />

      <PrivacyDetailTemplate title="Complaints Procedure">

        {/* 1 */}
        <h2 className="text-xl font-semibold text-[#111827] mt-6">1. Purpose of This Procedure</h2>
        <p>Daily Assist UK is committed to delivering reliable, respectful, and high-quality home-help services.</p>
        <p>We recognise that occasionally clients or their families may feel dissatisfied. This procedure ensures all complaints are:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Taken seriously</li>
          <li>Handled promptly and fairly</li>
          <li>Resolved wherever possible</li>
          <li>Used to improve our service</li>
        </ul>
        <p>This procedure applies to all clients, relatives, representatives, staff, and external professionals.</p>

        {/* 2 */}
        <h2 className="text-xl font-semibold text-[#111827] mt-6">2. What Counts as a Complaint?</h2>
        <p>A complaint is any expression of dissatisfaction about:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>The quality of a service</li>
          <li>Conduct or behaviour of a staff member</li>
          <li>Missed or late visits</li>
          <li>Communication issues</li>
          <li>Fees, charges, or billing</li>
          <li>Safety concerns</li>
          <li>Any aspect of service delivery</li>
        </ul>
        <p>Complaints may be made verbally, in writing, by email, or through a representative.</p>

        {/* 3 */}
        <h2 className="text-xl font-semibold text-[#111827] mt-6">3. How Clients Can Make a Complaint</h2>
        <p className="text-[#000000]">Clients may complain using any of the following:</p>

        <h3 className="text-xl font-semibold text-[#000000] mt-4">3.1 Verbal Complaint</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>To a visiting staff member</li>
          <li>To a supervisor or manager by phone</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#000000] mt-4">3.2 Written Complaint</h3>
        <p>Email or post:</p>
        <p><strong>Daily Assist UK – Complaints Officer</strong><br />
          info@dailyassistuk.com<br />
          [Add business address here]
        </p>

        <h3 className="text-xl font-semibold text-[#000000] mt-4">3.3 Through a Representative</h3>
        <p>A family member, friend, advocate, GP or other professional may submit a complaint on behalf of the client with permission.</p>

        {/* 4 */}
        <h2 className="text-xl font-semibold text-[#111827] mt-6">4. Procedure for Handling Complaints</h2>

        <h3 className="text-xl font-semibold text-[#000000] mt-4">4.1 Step 1 – Acknowledgement (Within 48 Hours)</h3>
        <p>Daily Assist UK will:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Acknowledge the complaint</li>
          <li>Clarify issues if needed</li>
          <li>Explain the next steps and expected timescales</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#000000] mt-4">4.2 Step 2 – Investigation (Within 10 Working Days)</h3>
        <p>A senior member of staff will:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Review visit logs, communication records, or staff statements</li>
          <li>Speak privately with those involved</li>
          <li>Gather evidence objectively</li>
        </ul>
        <p>The complainant will be kept informed throughout the process.</p>

        <h3 className="text-xl font-semibold text-[#000000] mt-4">4.3 Step 3 – Response & Outcome</h3>
        <p>Daily Assist UK will provide a written response outlining:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Findings</li>
          <li>Any service improvements</li>
          <li>Corrective actions (if required)</li>
          <li>Any remedies offered</li>
        </ul>
        <p>If more time is required for the investigation, the complainant will be notified.</p>

        {/* 5 */}
        <h2 className="text-2xl font-semibold text-[#111827] mt-6">5. If the Client Is Not Satisfied</h2>
        <p className="text-[#6b7280]">If the complainant remains unhappy after receiving the outcome, they may:</p>

        <h3 className="text-xl font-semibold text-[#000000] mt-4">5.1 Request an Internal Review</h3>
        <p>A different senior manager will reassess the complaint and investigation.</p>

        <h3 className="text-xl font-semibold text-[#000000] mt-4">5.2 Contact External Bodies</h3>
        <p>Clients may escalate to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Local Authority Adult Social Care Team</strong></li>
          <li><strong>Essex County Council Safeguarding Team</strong> (if safeguarding concerns exist)</li>
          <li><strong>Police</strong> (if a crime may have occurred)</li>
          <li><strong>Citizens Advice</strong></li>
          <li><strong>Ombudsman</strong> (if referred through a commissioning body)</li>
        </ul>
        <p>Daily Assist UK will provide details as needed.</p>

        {/* 6 */}
        <h2 className="text-2xl font-semibold text-[#111827] mt-6">6. Recording & Monitoring Complaints</h2>
        <p>Daily Assist UK will:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Log all complaints in a secure Complaints Register</li>
          <li>Record actions taken and outcome</li>
          <li>Store records securely in line with GDPR</li>
          <li>Review patterns quarterly to improve service quality</li>
        </ul>

        {/* 7 */}
        <h2 className="text-2xl font-semibold text-[#111827] mt-6">7. Staff Responsibilities</h2>
        <p>All staff must:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Report complaints immediately to the manager</li>
          <li>Cooperate fully with investigations</li>
          <li>Maintain confidentiality</li>
          <li>Never retaliate or treat a complainant unfairly</li>
        </ul>
        <p>Failure to follow this procedure may result in disciplinary action.</p>

        {/* 8 */}
        <h2 className="text-2xl font-semibold text-[#111827] mt-6">8. Learning & Continuous Improvement</h2>
        <p>Daily Assist UK uses complaints data to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Identify training needs</li>
          <li>Improve communication</li>
          <li>Strengthen procedures</li>
        </ul>
        <p>Enhance the client experience</p>

        {/* 9 */}
        <h2 className="text-2xl font-semibold text-[#111827] mt-6">9. Review of Procedure</h2>
        <p>This Complaints Procedure will be reviewed annually or sooner if legislation or operations change.</p>

      </PrivacyDetailTemplate>
    </main>
  );
}