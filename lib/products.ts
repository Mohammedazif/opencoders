export type ProductFeature = {
  title: string
  body: string
}

export type Product = {
  slug: string
  name: string
  tagline: string
  summary: string
  category: string
  status: 'Live' | 'Beta' | 'In development'
  /** Two colours for the generated cover art */
  tint: [string, string]
  /** Short glyph drawn on the cover */
  glyph: string
  features: ProductFeature[]
  stack: string[]
  link?: { label: string; href: string }
}

export const products: Product[] = [
  {
    slug: 'opentwin',
    name: 'OpenTwin',
    tagline: 'Digital twin for buildings.',
    summary:
      'Upload a building model, connect your building systems and IoT devices, and see live data, alarms, and history on the 3D model. Set up in the browser, with no custom code per site.',
    category: 'Digital twin',
    status: 'Beta',
    tint: ['#0f766e', '#34d399'],
    glyph: 'Tw',
    features: [
      {
        title: 'Upload any model',
        body: 'Drag and drop IFC, GLB, or glTF. Floors and rooms are read from the model automatically.',
      },
      {
        title: 'Equipment register',
        body: 'Built from the model using 16 equipment templates, or imported from a spreadsheet or COBie.',
      },
      {
        title: 'Connect building systems',
        body: 'BACnet, Modbus, OPC UA, MQTT, Project Haystack, REST, webhooks, and CSV.',
      },
      {
        title: 'Automatic linking',
        body: 'Data points are matched to their equipment automatically. Unsure matches wait for review.',
      },
      {
        title: 'Live 3D twin',
        body: 'Live values on equipment, colour by status, floor isolation, and click to inspect.',
      },
      {
        title: 'Dashboards and alarms',
        body: 'A dashboard for every piece of equipment, plus alarm rules with email notifications.',
      },
    ],
    stack: ['IFC', 'That Open Components', 'React', 'FastAPI', 'BACnet', 'Modbus', 'OPC UA', 'MQTT', 'Postgres'],
    link: { label: 'Open OpenTwin', href: 'https://opentwin-iota.vercel.app' },
  },
  {
    slug: 'opendesk',
    name: 'OpenDesk',
    tagline: 'Project collaboration for AEC teams.',
    summary:
      'Models, drawings, issues, and documents in one shared workspace for the whole project team.',
    category: 'Collaboration',
    status: 'In development',
    tint: ['#4338ca', '#a78bfa'],
    glyph: 'Dk',
    features: [
      {
        title: 'View models in the browser',
        body: 'Open IFC models without installing anything and share views with the team.',
      },
      {
        title: 'Issue tracking',
        body: 'Pin issues to model elements, assign them, and track them until closed.',
      },
      {
        title: 'Document management',
        body: 'Keep drawings, specs, and RFIs linked to the parts of the building they cover.',
      },
      {
        title: 'Team overview',
        body: 'See who is working on what across disciplines and companies.',
      },
    ],
    stack: ['OpenBIM', 'IFC', 'BCF', 'Web app'],
  },
  {
    slug: 'openland',
    name: 'OpenLand',
    tagline: 'Site planning and feasibility.',
    summary:
      'Load a site, check planning rules, and test layouts and building massing at the early stage of a project.',
    category: 'Site planning',
    status: 'In development',
    tint: ['#b45309', '#fbbf24'],
    glyph: 'Ld',
    features: [
      {
        title: 'Site context',
        body: 'Plot boundaries, terrain, and nearby buildings in one 3D view.',
      },
      {
        title: 'Planning rule checks',
        body: 'Setbacks, height limits, and plot coverage checked while you design.',
      },
      {
        title: 'Layout options',
        body: 'Test plot layouts and building volumes and compare them side by side.',
      },
      {
        title: 'Export to BIM',
        body: 'Export the chosen option to IFC to start detailed design.',
      },
    ],
    stack: ['GIS', 'Web 3D', 'Rule engine', 'IFC export'],
  },
  {
    slug: 'cad-revit-plugins',
    name: 'CAD & Revit plugins',
    tagline: 'Automation for Revit and AutoCAD.',
    summary:
      'Add-ins for Revit and AutoCAD that automate model checks, exports, sheets, and data management.',
    category: 'Automation',
    status: 'Live',
    tint: ['#0369a1', '#00dcff'],
    glyph: 'Rv',
    features: [
      {
        title: 'Model checks',
        body: 'Check naming, parameters, and company standards, and get a clear report.',
      },
      {
        title: 'Batch exports',
        body: 'Export IFC, sheets, and schedules in one step.',
      },
      {
        title: 'Data sync',
        body: 'Move parameters between the model, Excel, and other systems.',
      },
      {
        title: 'Custom plugins',
        body: 'Plugins built for your office standards and workflows.',
      },
    ],
    stack: ['Revit API', 'AutoCAD', 'C# / .NET', 'Dynamo', 'IFC'],
  },
]

export function productBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}
