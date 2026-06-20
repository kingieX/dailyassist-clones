import PrivacyHeroSection from "../../components/sections/privacy/PrivacyHeroSection";
import PrivacyDetailTemplate from "../../components/sections/privacy/PrivacyDetailTemplate";

export default function PrivacyPage5() {
  return (
    <main>
      <PrivacyHeroSection />
      <PrivacyDetailTemplate title="Medication & Personal Care Exclusion Policy">

        <h2 className="text-lg font-semibold text-[#111827] mt-6">1. Purpose of This Policy</h2>
        <p>The purpose of this policy is to clearly define the boundaries of support provided by <strong>Daily Assist UK</strong> and ensure that staff, clients, families, and partner organisations understand that Daily Assist UK does <strong>not</strong> carry out <strong>regulated personal care</strong> or <strong>medication administration.</strong></p>
        <p>This policy protects clients, staff, and the organisation by preventing tasks that legally require CQC registration or clinical qualification.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">2. Scope</h2>
        <p>This policy applies to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>All Daily Assist UK staff (employed or contracted)</li>
          <li>All clients receiving services</li>
          <li>All service agreements and care plans</li>
        </ul>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">3. Services Daily Assist UK Does Not Provide</h2>
        <p className="text-[#6b7280]">Daily Assist UK does not offer any task that falls under regulated personal care or medication administration.</p>

        <h3 className="text-base font-semibold text-[#111827] mt-4">3.1 Personal Care Tasks Not Provided</h3>
        <p>Staff must <strong>never</strong> carry out:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Washing or bathing clients</li>
          <li>Assistance with toileting</li>
          <li>Changing pads, continence aids or clothing</li>
          <li>Dressing or undressing clients</li>
          <li>Shaving, grooming, nail cutting, or intimate care</li>
          <li>Lifting or transferring clients physically (hoists, mobility aids requiring training)</li>
          <li>Feeding clients who cannot eat independently for medical reasons</li>
          <li>Any task considered "hands-on" personal care</li>
        </ul>
        <p>These activities constitute regulated care under CQC rules and are outside the scope of Daily Assist UK.</p>

        <h3 className="text-base font-semibold text-[#111827] mt-4">3.2 Medication Tasks Not Provided</h3>
        <p>Staff must <strong>never:</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Administer medication of any kind (oral, topical, inhaled, injected)</li>
          <li>Prompt medication as part of regulated care</li>
          <li>Apply creams, ointments, patches, or medicated products</li>
          <li>Handle blister packs, dosette boxes, or liquid medications</li>
          <li>Record MAR sheets or medication logs</li>
          <li>Make decisions relating to medication timing, dosage, or frequency</li>
        </ul>
        <p>Daily Assist UK is a <strong>non-medical home-help service</strong> and must avoid being mistaken for a regulated care provider.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">4. Allowed Support Related to Medication (Non-Regulated)</h2>
        <p>Staff may provide <strong>low-risk, non-contact support</strong>, such as:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Reminding a client to take their medication <strong>only when the box is already open and in front of them</strong></li>
          <li>Reading medication instructions out loud</li>
          <li>Collecting medication from a pharmacy</li>
          <li>Placing medication within the client's reach</li>
        </ul>
        <p><strong>Staff must not touch, prepare, or administer medication under any circumstances.</strong></p>
        <p>If a client cannot take medication independently, Daily Assist UK will signpost to a regulated provider.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">5. Allowed Support Related to Wellbeing (Non-Personal Care)</h2>
        <p>Daily Assist UK staff may provide:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>General welfare check-ins</li>
          <li>Light household tasks</li>
          <li>Meal preparation (not assisted eating)</li>
          <li>Errands and shopping</li>
          <li>Transport to appointments</li>
          <li>Social support and companionship</li>
        </ul>
        <p>These tasks remain within the non-regulated home-help sector.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">6. Risk Escalation Procedure</h2>
        <p>If staff notice:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>A client declining in mobility</li>
          <li>Increasing personal care needs</li>
          <li>Medication mismanagement</li>
          <li>Health or safety risks</li>
        </ul>
        <p>They must:</p>
        <ol className="list-decimal pl-6 space-y-1">
          <li><strong>Stop the activity</strong></li>
          <li><strong>Report immediately to the Manager</strong></li>
          <li>Record the concern using the <strong>Incident/Concern Form</strong></li>
          <li>Inform family/next of kin where appropriate</li>
          <li>Recommend referral to a regulated service</li>
        </ol>
        <p>Daily Assist UK will never continue support that becomes unsafe or outside scope.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">7. Staff Responsibilities</h2>
        <p>All staff must:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Read and understand this policy before starting work</li>
          <li>Maintain clear professional boundaries</li>
          <li>Decline any task outside Daily Assist UK's remit</li>
          <li>Report all client requests for personal care or medication support beyond policy</li>
          <li>Never take instructions directly from family that contradict this policy</li>
        </ul>
        <p>Failure to follow this policy may result in disciplinary action.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">8. Client & Family Communication</h2>
        <p>All clients receive:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>This policy in their Welcome Pack</li>
          <li>A clear explanation during sign-up</li>
          <li>Written reminders in their Service Agreement</li>
        </ul>
        <p>Daily Assist UK ensures clients understand that we are a <strong>home-help service</strong>, not a care agency.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">9. Review of Policy</h2>
        <p>This policy is reviewed annually or sooner if:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Regulations change</li>
          <li>Services expand</li>
          <li>Incident reviews require amendments</li>
        </ul>

      </PrivacyDetailTemplate>
    </main>
  );
}