import SiteSubmissionForm from "@/components/SiteSubmissionForm";

const metrics = [
  ["10–15", "Initial Phase 1 jobs"],
  ["10k–20k", "Preferred existing industrial square feet"],
  ["$1M–$3M", "Preliminary total project envelope"],
  ["U.S.", "Assembly location under active evaluation"],
];

const cards = [
  {
    number: "01",
    title: "Mechanically mature",
    text: "WE is developing around proven small-displacement architecture rather than reinventing every mechanical subsystem. The focus is disciplined industrialization, serviceability, supplier resilience, and a credible path to compliant production.",
  },
  {
    number: "02",
    title: "Visually proprietary",
    text: "Bodywork, lighting, controls, interface, finish, badging, ergonomics and limited-edition aesthetics are where WE intends to create a recognizable product identity—with selected riding communities participating as design partners.",
  },
  {
    number: "03",
    title: "Digitally connected",
    text: "Embedded telematics, fleet/rental software, vehicle data and connected ownership features are being designed as part of the platform—not as an aftermarket layer added after manufacturing.",
  },
];

const needs = [
  "An existing 10,000–20,000 sq. ft. industrial/manufacturing building",
  "Fast occupancy and practical zoning for light vehicle assembly",
  "Receiving, loading, parts storage, assembly, QC/testing and shipping capability",
  "Competitive Year 1–5 occupancy economics",
  "Equipment, tooling, site-work or infrastructure assistance where available",
  "Workforce recruiting, customized training and OJT support",
  "Utility/energy support and sufficient electrical capacity",
  "Transparent tax relief, PILOT or enterprise-zone benefits",
];

const evaluates = [
  "Cash required from WE before the first compliant, saleable production unit",
  "Speed to occupancy and production readiness",
  "Real—not theoretical—local, state, utility and workforce support",
  "Match requirements, collateral, guarantees and repayment conditions",
  "Job and wage commitments we can responsibly meet",
  "Clawbacks and long-term flexibility as the company scales",
  "Access to engineering, manufacturing, supplier and talent ecosystems",
  "Ability to expand without forcing Phase 1 into unnecessary ground-up construction",
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <div className="shell navInner">
          <a className="brand" href="#top" aria-label="WE Manufacturing home">
            <span className="brandMark">WE</span>
            <span>WE MANUFACTURING</span>
          </a>
          <nav className="navLinks" aria-label="Primary navigation">
            <a href="#project">Project</a>
            <a href="#requirements">Site requirements</a>
            <a className="navCta" href="#submit">Submit a site</a>
          </nav>
        </div>
      </header>

      <div id="top" className="shell hero">
        <div className="heroGrid">
          <div>
            <div className="eyebrow">Phase 1 U.S. site selection • Pre-production</div>
            <h1>BUILD THE FIRST WE WITH US.</h1>
            <p className="heroCopy">
              WE is developing a connected small-mobility platform around an approximately 125cc-class street motorcycle,
              embedded telematics, software and community-led product design. We are evaluating the U.S. location for our
              first assembly operation—and inviting serious communities to compete for the project.
            </p>
            <div className="heroActions">
              <a className="btn btnPrimary" href="#submit">Submit a location</a>
              <a className="btn" href="#requirements">View Phase 1 requirements</a>
            </div>
          </div>
          <aside className="heroPanel" aria-label="Current project status">
            <div className="eyebrow">Current scope</div>
            <div className="statusLine"><span>Company stage</span><strong>Pre-production</strong></div>
            <div className="statusLine"><span>Technical path</span><strong>Partner + supplier validation</strong></div>
            <div className="statusLine"><span>Facility strategy</span><strong>Existing building preferred</strong></div>
            <div className="statusLine"><span>Locations</span><strong>Connecticut + Georgia under evaluation</strong></div>
            <div className="statusLine"><span>Final site</span><strong>Not selected</strong></div>
          </aside>
        </div>
      </div>

      <div className="shell metrics" aria-label="Phase 1 project metrics">
        {metrics.map(([value, label]) => (
          <div className="metric" key={label}>
            <div className="eyebrow">Phase 1</div>
            <b>{value}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <section id="project">
        <div className="shell">
          <div className="sectionHead">
            <div className="eyebrow">The project</div>
            <div>
              <h2>A vehicle company built around product, software and culture.</h2>
              <p>
                WE is not presenting a finished factory or pretending the product is already in mass production. The company
                is intentionally at the stage where supplier decisions, prototype development, assembly strategy, facility
                economics and local partnerships can still materially shape the launch.
              </p>
            </div>
          </div>
          <div className="cards">
            {cards.map((card) => (
              <article className="card" key={card.number}>
                <div className="cardNumber">{card.number} / PLATFORM PRINCIPLE</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
          <div className="callout">
            <strong>Design-partner strategy:</strong> WE is selecting motorcycle communities to help shape limited-edition
            aesthetics before the production design is frozen. Engineering, safety, compliance and manufacturing remain under
            WE and its technical partners; culture and identity are developed with people who actually ride.
          </div>
        </div>
      </section>

      <section id="requirements">
        <div className="shell">
          <div className="sectionHead">
            <div className="eyebrow">Site selection</div>
            <div>
              <h2>We are asking communities for a real package—not a brochure.</h2>
              <p>
                Phase 1 is designed to move quickly and avoid unnecessary ground-up construction. Municipalities, development
                authorities, property owners, utilities and state partners should show us the building, the economics, the
                support, the conditions and the earliest credible occupancy date.
              </p>
            </div>
          </div>
          <div className="split">
            <div className="scopeBox">
              <div className="eyebrow">What WE needs</div>
              <h3>Phase 1 facility profile</h3>
              <ul className="cleanList">
                {needs.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="scopeBox">
              <div className="eyebrow">How WE compares offers</div>
              <h3>Decision criteria</h3>
              <ul className="cleanList">
                {evaluates.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="callout">
            <strong>Our key economic question:</strong> what does WE actually have to fund in cash before the first compliant,
            saleable unit leaves the line? Incentives that only arrive after large unreimbursed spending are evaluated
            differently from support that reduces the launch requirement directly.
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="sectionHead">
            <div className="eyebrow">Geographic strategy</div>
            <div>
              <h2>Connecticut and Georgia are both being taken seriously.</h2>
              <p>
                The founder is Connecticut-based, while Georgia has been part of the manufacturing-development process. WE is
                evaluating whether Phase 1 assembly, technology/R&amp;D, or later expansion should be concentrated in one state
                or divided across complementary operations. No state or municipality has been selected in advance.
              </p>
            </div>
          </div>
          <div className="cards">
            <article className="card">
              <div className="cardNumber">CONNECTICUT</div>
              <h3>Technology + manufacturing depth</h3>
              <p>Potential alignment around product development, embedded systems, prototyping, precision manufacturing, workforce and founder proximity.</p>
            </article>
            <article className="card">
              <div className="cardNumber">GEORGIA</div>
              <h3>Assembly + growth path</h3>
              <p>Active economic-development relationships, site conversations and a strong case for scalable U.S. assembly and Southeast distribution.</p>
            </article>
            <article className="card">
              <div className="cardNumber">THE DECISION</div>
              <h3>Execution wins</h3>
              <p>The strongest package will be the one that lowers launch friction while preserving a responsible path to jobs, compliance, quality and expansion.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="submit">
        <div className="shell formWrap">
          <div className="formIntro">
            <div className="eyebrow">Municipal + site RFI</div>
            <h2>Put your community in the room.</h2>
            <p>
              If you represent a municipality, development authority, regional EDO, utility, property owner or other authorized
              project partner, submit the strongest realistic Phase 1 package your location can support.
            </p>
            <p>
              Specific answers beat generic incentive summaries. If multiple entities support the same site, coordinate the
              package or identify the partners WE should speak with next.
            </p>
            <p><strong>Direct project contact:</strong><br />Matthew McCluster<br />matthew@mccluster.org</p>
          </div>
          <SiteSubmissionForm />
        </div>
      </section>

      <footer className="footer">
        <div className="shell footerGrid">
          <div className="brand"><span className="brandMark">WE</span><span>WE MANUFACTURING</span></div>
          <div className="small">
            Project figures on this page are preliminary planning assumptions for site-selection purposes and remain subject to
            engineering, supplier, financing, regulatory and facility validation. Submission of a site or incentive package
            does not create a commitment by either party.
          </div>
        </div>
      </footer>
    </main>
  );
}
