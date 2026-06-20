import PrivacyHeroSection from "../../components/sections/privacy/PrivacyHeroSection";
import PrivacyDetailTemplate from "../../components/sections/privacy/PrivacyDetailTemplate";

export default function PrivacyPage6() {
  return (
    <main>
      <PrivacyHeroSection />
      <PrivacyDetailTemplate title="Risk Assessment Procedure">

        <h2 className="text-lg font-semibold text-[#111827] mt-6">1. Purpose</h2>
        <p>The purpose of this procedure is to ensure all risks associated with Daily Assist UK's activities — particularly home-help, errands, transport assistance, and welfare visits — are identified, assessed, controlled, monitored, and reviewed. The aim is to protect clients, staff, volunteers, and members of the public from harm while ensuring legal compliance with UK Health & Safety legislation.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">2. Scope</h2>
        <p>This procedure applies to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>All Daily Assist UK staff (including part-time, full-time, and agency workers)</li>
          <li>Any individuals representing Daily Assist UK</li>
        </ul>
        <p>All locations where work is carried out (client homes, community settings, public spaces, vehicles, and staff working remotely)</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">3. Responsibilities</h2>
        <h3 className="text-base font-semibold text-[#111827] mt-4">3.1 Management Responsibilities</h3>
        <p>Daily Assist UK management must:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Ensure all significant risks are formally assessed and documented.</li>
          <li>Provide staff with training on risk assessment principles and safe working practices.</li>
          <li>Ensure appropriate control measures are implemented and maintained.</li>
          <li>Review all assessments at least annually or when risks change.</li>
          <li>Investigate accidents, near misses, or reported hazards promptly.</li>
        </ul>

        <h3 className="text-base font-semibold text-[#111827] mt-4">3.2 Staff Responsibilities</h3>
        <p>All staff must:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Carry out dynamic (on-the-spot) risk assessments during visits.</li>
          <li>Report hazards, incidents, near misses, or risks immediately to management.</li>
          <li>Follow all control measures and safe working practices.</li>
          <li>Refuse to work in unsafe conditions and escalate concerns.</li>
          <li>Ensure client confidentiality while reporting risks appropriately.</li>
        </ul>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">4. Types of Risk Assessments Used by Daily Assist UK</h2>
        <h3 className="text-base font-semibold text-[#111827] mt-4">4.1 General Workplace Risk Assessment</h3>
        <p>Covers common risks relevant to all staff (e.g., lone working, manual handling, infection prevention).</p>

        <h3 className="text-base font-semibold text-[#111827] mt-4">4.2 Home-Visit (Client Environment) Risk Assessment</h3>
        <p>Completed during initial assessment or first visit, covering:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access to property</li>
          <li>Pets or animals</li>
          <li>Cleanliness / hazards</li>
          <li>Aggression or behavioural concerns</li>
          <li>Trip/fall hazards</li>
          <li>Smoking, damp, or ventilation issues</li>
          <li>Neighbour or family risks</li>
          <li>Emergency arrangements</li>
        </ul>

        <h3 className="text-base font-semibold text-[#111827] mt-4">4.3 Dynamic Risk Assessment (DRA) - On-the-Spot</h3>
        <p>Used by staff continuously during work to identify immediate hazards such as:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Dangerous behaviour from client or visitors</li>
          <li>Unsafe equipment or furniture</li>
          <li>Environmental risks — steps, ice, clutter, exposed wiring, etc.</li>
        </ul>
        <p>Staff must stop work immediately if a risk cannot be controlled safely.</p>

        <h3 className="text-base font-semibold text-[#111827] mt-4">4.4 Individual Staff Risk Assessment</h3>
        <p>Completed where specific staff vulnerabilities exist (pregnancy, disability, new staff, etc.).</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">5. Risk Assessment Process</h2>
        <p className="text-[#6b7280]">Daily Assist UK applies a standard 5-step process:</p>

        <h3 className="text-base font-semibold text-[#111827] mt-4">Step 1: Identify Hazards</h3>
        <p>Examples include:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Slips, trips, and falls</li>
          <li>Lone working risks</li>
          <li>Challenging behaviour</li>
          <li>Pets</li>
          <li>Manual handling tasks</li>
          <li>Infection risks</li>
          <li>Unsafe household conditions</li>
          <li>Vehicle/transport risks</li>
        </ul>

        <h3 className="text-base font-semibold text-[#111827] mt-4">Step 2: Decide Who May Be Harmed and How</h3>
        <p>This includes clients, staff, visitors, family members, and the wider public.</p>

        <h3 className="text-base font-semibold text-[#111827] mt-4">Step 3: Evaluate the Risks and Control Them</h3>
        <p>Use appropriate control measures such as:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>PPE and hygiene procedures</li>
          <li>Avoiding unsafe rooms or areas</li>
          <li>Keeping exits clear</li>
          <li>Not lifting heavy objects alone</li>
          <li>Ending visits early if unsafe</li>
          <li>Contacting management for support</li>
        </ul>

        <h3 className="text-base font-semibold text-[#111827] mt-4">Step 4: Record Findings</h3>
        <p>Risk assessments must be:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Clear, concise, and dated</li>
          <li>Logged in the Daily Assist UK record system</li>
        </ul>
        <p>Accessible to staff who need them</p>

        <h3 className="text-base font-semibold text-[#111827] mt-4">Step 5: Review and Update</h3>
        <p>Risk assessments must be reviewed:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>At least annually</li>
          <li>When a client's condition or environment changes</li>
          <li>After an incident or near miss</li>
          <li>When staff raise concerns</li>
        </ul>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">6. Escalation Procedure for High-Risk Situations</h2>
        <p>Staff must immediately contact a manager if:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>A client behaves aggressively or unpredictably</li>
          <li>There is evidence of neglect, abuse, or safeguarding concern</li>
          <li>A home environment becomes unsafe (e.g., infestations, structural problems)</li>
          <li>A client collapses or requires emergency services</li>
          <li>A pet behaves dangerously</li>
          <li>A threatening person is present</li>
        </ul>
        <p>If immediate danger exists:</p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Leave the environment.</li>
          <li>Move to a safe location.</li>
          <li>Call 999 if necessary.</li>
          <li>Notify management immediately.</li>
        </ol>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">7. Training Requirements</h2>
        <p>All staff must complete training in:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Risk awareness and dynamic risk assessment</li>
          <li>Lone working safety</li>
          <li>Manual handling</li>
          <li>Infection prevention & control</li>
          <li>Safeguarding adults</li>
          <li>Reporting procedures for accidents and incidents</li>
        </ul>
        <p>Training must be refreshed annually.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">8. Monitoring and Review</h2>
        <p>Daily Assist UK will:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Monitor incident reports to spot trends</li>
          <li>Inform staff of new risks or updated controls</li>
          <li>Review all procedures annually or when regulations change</li>
          <li>Conduct spot checks and audits on risk assessment quality</li>
        </ul>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">9. Documentation Required</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Home Visit Risk Assessment Form</li>
          <li>Lone Working Risk Assessment</li>
          <li>Individual Client Risk Profiles</li>
          <li>Dynamic Risk Assessment Notes (where needed)</li>
          <li>Incident & Accident Report Forms</li>
          <li>Annual review logs</li>
        </ul>
        <p>All documents are stored securely in line with GDPR.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">10. Policy Review</h2>
        <p>This Risk Assessment Procedure will be reviewed:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Every 12 months</li>
          <li>Following any major incident</li>
          <li>When legislation or best practice is updated</li>
        </ul>

      </PrivacyDetailTemplate>
    </main>
  );
}