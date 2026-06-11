import supabase from './supabaseClient';

// Premium mock news data with rich content for fallbacks and initial testing
const MOCK_NEWS = [
  {
    id: "recruitment-drive-2026",
    title: "ORBITL Announces New Recruitment Drive",
    date: "June 10, 2026",
    description: "We are opening our doors to passionate students from all engineering disciplines to join our upcoming satellite project.",
    content: `ORBITL is excited to announce our upcoming recruitment campaign for the 2026-2027 academic year. As a student-led satellite and space technology organization, we offer a unique hands-on environment to design, build, and fly space hardware.

### Who We Are Looking For
We are recruiting across all technical and non-technical disciplines:
- **OBC & Flight Software (FSW):** C/C++, Real-Time Operating Systems (RTOS), and hardware integration.
- **Electrical Power Systems (EPS) & ADCS:** PCB design, power management, attitude control theory, and sensors.
- **Communications (COMMS) & Ground Station:** Radio frequency systems, link budgets, and signal processing.
- **Structure & Payload:** Mechanical design, thermal analysis, and specialized experiment design.
- **Business & Social Media:** Sponsorships, logistics, public relations, and content creation.

### Why Join ORBITL?
Joining ORBITL is more than just an extracurricular activity; it's a launchpad for your career in space and high-tech industries. Members gain experience with professional engineering tools, work in collaborative cross-functional teams, and establish connections with leading aerospace experts and national space agencies.

### How to Apply
Applications will open on June 15, 2026. Keep an eye on our [Join page](/join) for application templates and deadlines. We look forward to seeing what you bring to the team!`,
    image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200"
  },
  {
    id: "propulsion-test-success",
    title: "Successful Test of New Propulsion Module",
    date: "May 24, 2026",
    description: "Our propulsion team successfully completed the static fire test of the new micro-thruster design in the KMITL labs.",
    content: `ORBITL's propulsion team has achieved a major milestone by successfully completing a static fire test of our custom-developed micro-thruster. The test took place at KMITL's high-vacuum chambers, proving the viability of our cold-gas propulsion architecture.

### Technical Achievements
During the test sequence, the thruster achieved:
- **Total Impulse:** Exceeded design requirements by 12%, demonstrating higher fuel efficiency.
- **Specific Impulse (Isp):** Measured at 68 seconds, optimal for low-Earth orbit attitude adjustment maneuvers.
- **Thermal Stability:** Maintained safe structural temperatures throughout the 30-second continuous firing window.

### Looking Ahead
This propulsion module is slated to fly on our next CubeSat mission, allowing the spacecraft to maintain its orbit and perform active de-orbiting at the end of its operational life. The team is now working on finalizing the thruster's space-qualification model and integration procedures.`,
    image_url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200"
  },
  {
    id: "space-agency-partnership",
    title: "Partnership with National Space Agency",
    date: "April 15, 2026",
    description: "ORBITL has signed a memorandum of understanding to collaborate on educational outreach programs.",
    content: `We are proud to announce that ORBITL has signed a Memorandum of Understanding (MoU) with the National Space Agency. This formal partnership marks a significant milestone in our commitment to fostering space science education and collaborative research.

### Collaborative Initiatives
Under this agreement, ORBITL and the Space Agency will collaborate on:
- **Co-developed Payloads:** Designing scientific instruments to fly on national technology demonstration satellites.
- **Data Sharing:** Gaining access to orbital telemetry databases for calibration and testing of our ground station software.
- **Mentorship:** Connecting student members with professional aerospace engineers for project reviews and career development.

This partnership elevates the scope of our missions and provides our members with unparalleled educational opportunities. We look forward to launching this collaboration.`,
    image_url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200"
  },
  {
    id: "avionics-pcb-finalized",
    title: "Avionics Team Finalizes PCB Design",
    date: "March 02, 2026",
    description: "The core flight computer design has been finalized and sent for manufacturing, marking a major milestone.",
    content: `The avionics subsystem team at ORBITL has officially signed off on the schematic and layout for our second-generation main Onboard Computer (OBC). The design files have been dispatched to our fabrication partner, putting us on track for assembly and integration testing next month.

### Design Highlights
The new OBC includes several critical improvements:
- **Redundancy:** Dual microcontrollers operating in hot-standby configuration to mitigate cosmic ray radiation events.
- **Sensors:** Integrated high-precision IMUs and temperature sensors for real-time state estimation.
- **Power Efficiency:** Reduced operational power draw by 25% compared to our v1 flight computer, easing the load on our battery systems.

The hardware debugging phase will begin immediately upon arrival of the boards. Kudos to the avionics team for their tireless work over the last six months!`,
    image_url: "https://images.unsplash.com/photo-1517055727195-b40af66ed50b?q=80&w=1200"
  }
];

/**
 * Fetches all news articles from the configured CMS.
 * Falls back to local mock news if fetching fails or if CMS is unconfigured.
 */
export async function fetchNews() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // Map database fields to standard schema
        return data.map(item => ({
          id: item.id.toString(),
          title: item.title,
          date: item.date || new Date(item.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          description: item.description,
          content: item.content,
          image_url: item.image_url || null
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to mock data:', err.message);
    }
  }

  // Fallback to local mock data
  return MOCK_NEWS;
}

/**
 * Fetches a single news article by ID or slug.
 */
export async function fetchNewsById(id) {
  if (supabase) {
    try {
      // Try querying by UUID
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        // If it looks like a text slug instead of a UUID, we can try searching by title or code matches
        // For simplicity, we just throw or try to match if standard select fails
        throw error;
      }

      if (data) {
        return {
          id: data.id.toString(),
          title: data.title,
          date: data.date || new Date(data.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          description: data.description,
          content: data.content,
          image_url: data.image_url || null
        };
      }
    } catch (err) {
      console.warn(`Supabase news fetch for ID ${id} failed, checking mock data:`, err.message);
    }
  }

  // Find in mock data
  const mockItem = MOCK_NEWS.find(item => item.id === id);
  if (mockItem) {
    return mockItem;
  }

  throw new Error(`News article with ID ${id} not found.`);
}
