import PrivacyHeroSection from "../../components/sections/privacy/PrivacyHeroSection";
import PrivacyDetailTemplate from "../../components/sections/privacy/PrivacyDetailTemplate";

export default function PrivacyPage4() {
  return (
    <main>
      <PrivacyHeroSection />
      <PrivacyDetailTemplate title="Health & Safety Policy">

        <h2 className="text-lg font-semibold text-[#111827] mt-6">1. Policy Statement</h2>
        <p>Daily Assist UK is committed to providing safe, healthy working conditions for all employees, clients, and members of the public affected by our services. We recognise our legal duties under the Health and Safety at Work etc. Act 1974 and are committed to preventing accidents, reducing risks, and promoting safe working practices across all our operations.</p>
        <p>Health and safety is everyone's responsibility, but management carries the ultimate duty to ensure that safe systems, training, equipment, and supervision are in place.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">2. Objectives</h2>
        <p>Daily Assist UK aims to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Prevent work-related injuries, accidents, and ill health.</li>
          <li>Identify hazards and implement effective control measures.</li>
          <li>Ensure staff receive appropriate health & safety information, instruction, and training.</li>
          <li>Provide safe equipment, safe working environments, and safe ways of working.</li>
          <li>Promote a culture of responsibility, awareness, and continuous improvement.</li>
          <li>Protect lone workers and staff working in clients' homes.</li>
          <li>Review health and safety performance annually.</li>
        </ul>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">3. Responsibilities</h2>
        <h3 className="text-base font-semibold text-[#111827] mt-4">3.1 Management Responsibilities</h3>
        <p>Daily Assist UK management will:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Ensure this policy is implemented, maintained, and reviewed.</li>
          <li>Conduct regular risk assessments, including home-visit and lone-working risks.</li>
          <li>Provide PPE where required.</li>
          <li>Ensure staff are trained in safe working practices, safeguarding, manual handling, infection control, and incident reporting.</li>
          <li>Investigate all accidents, near misses, and complaints.</li>
          <li>Ensure staff have access to up-to-date procedures and guidance.</li>
        </ul>

        <h3 className="text-base font-semibold text-[#111827] mt-4">3.2 Staff Responsibilities</h3>
        <p>All staff must:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Follow all health & safety procedures and training.</li>
          <li>Report hazards, risks, incidents, and unsafe conditions immediately.</li>
          <li>Use equipment safely and correctly.</li>
          <li>Work within the boundaries of their role (no personal care unless authorised and trained).</li>
          <li>Follow infection-control, manual handling, and lone-working procedures.</li>
          <li>Maintain their own health and safety while visiting clients' homes.</li>
        </ul>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">4. Risk Assessment</h2>
        <p>Daily Assist UK will carry out:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>General risk assessments for everyday duties</li>
          <li>Individual home-visit risk assessments</li>
          <li>Lone-working assessments</li>
          <li>Infection-control and environmental assessments</li>
          <li>Fire-safety awareness checks in client homes</li>
          <li>Manual-handling risk assessments where needed</li>
        </ul>
        <p>Assessments are reviewed annually or sooner if there is a significant change.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">5. Incident & Accident Reporting</h2>
        <p>Staff must report:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Accidents</li>
          <li>Near misses</li>
          <li>Injuries</li>
          <li>Verbal or physical aggression</li>
          <li>Environmental hazards</li>
          <li>Safeguarding concerns</li>
        </ul>
        <p>Daily Assist UK uses a standard <strong>Incident & Accident Report Form</strong> and follows an internal investigation procedure.</p>
        <p>Serious incidents must be escalated to management immediately.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">6. Lone Working</h2>
        <p>Because staff frequently work alone in the community, Daily Assist UK enforces strict lone-working procedures:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Mandatory check-in/check-out system</li>
          <li>Staff must always carry a charged mobile phone</li>
          <li>Clear visit schedules logged on the rota</li>
          <li>Refusal of visits where risk is deemed unacceptable</li>
          <li>Immediate reporting of threatening behaviour or unsafe environments</li>
          <li>No staff member enters a property if they feel unsafe</li>
        </ul>
        <p>A separate <strong>Lone Working Policy</strong> supports this document.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">7. Infection Control</h2>
        <p>To protect clients and staff, we require:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Regular hand hygiene</li>
          <li>Use of gloves and PPE when appropriate</li>
          <li>Staying home if unwell</li>
          <li>Cleaning materials used safely and stored appropriately</li>
          <li>Following COVID-safe practices when applicable</li>
        </ul>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">8. Manual Handling</h2>
        <p>Staff must not attempt to lift clients or perform tasks beyond their capability.</p>
        <p>Safe manual handling includes:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Avoiding unnecessary lifting</li>
          <li>Keeping loads close to the body</li>
          <li>Using correct posture</li>
          <li>Asking for assistance when required</li>
        </ul>
        <p>Training is provided during onboarding.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">9. Driving & Transport Safety</h2>
        <p>When transporting clients:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Vehicles must be roadworthy and insured with Class 1 Business Use</li>
          <li>Staff must hold a valid driving license</li>
          <li>Seatbelts must be worn at all times</li>
          <li>Clients must never sit in unsafe seating or beside loose objects</li>
          <li>Staff must not use mobile phones while driving</li>
        </ul>
        <p>Daily Assist UK may reimburse business-use insurance uplifts by mileage or allowance (agreed separately).</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">10. Home Environment Safety</h2>
        <p>Staff must actively monitor for hazards such as:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Slippery floors</li>
          <li>Poor lighting</li>
          <li>Overcrowded spaces</li>
          <li>Unsafe pets</li>
          <li>Faulty equipment</li>
          <li>Fire risks</li>
          <li>Carbon monoxide/smoke alarm concerns</li>
        </ul>
        <p>Hazards must be reported immediately.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">11. Emergency Procedures</h2>
        <p>Staff must know how to respond to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Medical emergencies</li>
          <li>Fire and evacuation</li>
          <li>Slips, trips, and falls</li>
          <li>Aggressive behaviour</li>
          <li>Road accidents</li>
          <li>Client collapse or sudden illness</li>
        </ul>
        <p>Emergency services must be called where needed, followed by internal reporting.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">12. Training</h2>
        <p>Daily Assist UK provides mandatory training in:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Health & safety</li>
          <li>Infection control</li>
          <li>Safeguarding adults</li>
          <li>Lone working</li>
          <li>Manual handling</li>
          <li>Data protection & confidentiality</li>
          <li>Risk assessment awareness</li>
        </ul>
        <p>Refresher training occurs annually or as required.</p>

        <h2 className="text-lg font-semibold text-[#111827] mt-6">13. Policy Review</h2>
        <p>This policy is reviewed <strong>every 12 months</strong>, or sooner if:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Legislation changes</li>
          <li>There is an incident requiring policy update</li>
          <li>The business expands or changes operations</li>
        </ul>

      </PrivacyDetailTemplate>
    </main>
  );
}