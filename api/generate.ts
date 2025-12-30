import type { VercelRequest, VercelResponse } from '@vercel/node'

type Document = {
  id: string
  title: string
  content: string
  summary: string
  relevance_score: number
}

const DOCUMENTS: Document[] = [
  {
    id: 'doc1',
    title: 'Contract Law Fundamentals',
    content: 'Contract Law Fundamentals full content discussing contract issues, examples, and common questions. This document covers the essential elements of a valid contract: offer, acceptance, consideration, capacity, and legality. It includes sample clauses, precedent summaries, and practical drafting notes. Example clause: "The party shall provide written notice within 30 days." Additional guidance and examples for contract law follow in subsequent sections to illustrate common pitfalls and remedies. The document also addresses breach of contract, remedies available to parties, and dispute resolution mechanisms including arbitration and mediation clauses.',
    summary: 'Contract Law Fundamentals summary focusing on contract guidance and actionable steps, including sample clauses and common pitfalls. Covers offer, acceptance, consideration, and breach remedies.',
    relevance_score: 0.95
  },
  {
    id: 'doc2',
    title: 'Employment Rights Guide',
    content: 'Employment Rights Guide full content discussing employment issues, examples, and common questions. This comprehensive guide covers employee rights, employer obligations, termination procedures, salary and benefits, workplace discrimination, and labor law compliance. It includes sample employment agreements, termination clauses, and practical drafting notes. Example clause: "Employment may be terminated by either party with 30 days written notice." Additional guidance covers wrongful termination, severance packages, non-compete agreements, and workplace safety regulations.',
    summary: 'Employment Rights Guide summary focusing on employment law guidance and actionable steps, including employee rights, termination procedures, and workplace compliance requirements.',
    relevance_score: 0.88
  },
  {
    id: 'doc3',
    title: 'Intellectual Property Overview',
    content: 'Intellectual Property Overview full content discussing intellectual property issues, examples, and common questions. This document covers patents, trademarks, copyrights, and trade secrets. It includes sample licensing agreements, patent application procedures, and practical drafting notes. Example clause: "The licensor grants the licensee exclusive rights to use the intellectual property for commercial purposes." Additional guidance covers IP protection strategies, infringement claims, fair use exceptions, and international IP law considerations.',
    summary: 'Intellectual Property Overview summary focusing on IP law guidance and actionable steps, including patent, trademark, and copyright protection strategies and licensing agreements.',
    relevance_score: 0.92
  },
  {
    id: 'doc4',
    title: 'Real Estate Law Essentials',
    content: 'Real Estate Law Essentials comprehensive guide covering property transactions, leases, zoning regulations, and property rights. This document includes information about purchase agreements, title searches, escrow procedures, landlord-tenant relationships, and property disputes. Example clause: "The buyer shall conduct a property inspection within 14 days of contract execution." Additional sections cover mortgage law, property taxes, easements, and real estate investment structures. The guide also addresses commercial real estate transactions and residential property regulations.',
    summary: 'Real Estate Law Essentials summary covering property transactions, leases, zoning, and property rights. Includes guidance on purchase agreements, landlord-tenant law, and property disputes.',
    relevance_score: 0.87
  },
  {
    id: 'doc5',
    title: 'Corporate Governance Framework',
    content: 'Corporate Governance Framework detailed overview of corporate structure, board responsibilities, shareholder rights, and regulatory compliance. This document covers corporate formation, bylaws, director duties, executive compensation, and fiduciary responsibilities. Example clause: "Directors must act in the best interests of the corporation and its shareholders." Additional guidance includes merger and acquisition procedures, corporate restructuring, SEC compliance, and corporate ethics policies. The framework also addresses stakeholder management and corporate social responsibility.',
    summary: 'Corporate Governance Framework summary focusing on corporate structure, board responsibilities, shareholder rights, and regulatory compliance. Covers formation, bylaws, and fiduciary duties.',
    relevance_score: 0.91
  },
  {
    id: 'doc6',
    title: 'Data Privacy and GDPR Compliance',
    content: 'Data Privacy and GDPR Compliance guide covering data protection regulations, privacy policies, consent management, and data breach procedures. This document includes information about GDPR requirements, CCPA compliance, data processing agreements, and individual privacy rights. Example clause: "Data subjects have the right to access, rectify, or delete their personal data upon request." Additional sections cover international data transfers, privacy impact assessments, data retention policies, and cybersecurity measures. The guide also addresses industry-specific privacy requirements and enforcement mechanisms.',
    summary: 'Data Privacy and GDPR Compliance summary covering data protection regulations, privacy policies, consent management, and breach procedures. Includes GDPR, CCPA, and international compliance guidance.',
    relevance_score: 0.89
  },
  {
    id: 'doc7',
    title: 'Tax Law and Compliance Guide',
    content: 'Tax Law and Compliance Guide comprehensive resource covering income tax, corporate tax, deductions, credits, and tax planning strategies. This document includes information about tax filing requirements, audit procedures, tax disputes, and international taxation. Example clause: "Taxpayers must maintain accurate records for at least seven years for audit purposes." Additional guidance covers estate tax, gift tax, tax-exempt organizations, and tax incentives. The guide also addresses state and local tax obligations and recent tax law changes.',
    summary: 'Tax Law and Compliance Guide summary covering income tax, corporate tax, deductions, and compliance. Includes filing requirements, audit procedures, and tax planning strategies.',
    relevance_score: 0.86
  },
  {
    id: 'doc8',
    title: 'Family Law and Divorce Procedures',
    content: 'Family Law and Divorce Procedures guide covering marriage, divorce, child custody, alimony, and property division. This document includes information about prenuptial agreements, separation agreements, child support calculations, and visitation rights. Example clause: "Child support payments shall be calculated based on both parents income and the childs needs." Additional sections cover adoption procedures, guardianship, domestic violence protection, and family court procedures. The guide also addresses same-sex marriage rights and international family law considerations.',
    summary: 'Family Law and Divorce Procedures summary covering marriage, divorce, child custody, and property division. Includes guidance on prenuptial agreements, child support, and family court procedures.',
    relevance_score: 0.84
  },
  {
    id: 'doc9',
    title: 'Criminal Law and Defense Strategies',
    content: 'Criminal Law and Defense Strategies comprehensive overview of criminal offenses, legal procedures, defense tactics, and sentencing guidelines. This document covers misdemeanors, felonies, criminal investigations, arrest procedures, and trial processes. Example clause: "Defendants have the right to remain silent and to legal representation during questioning." Additional guidance includes plea bargaining, evidence rules, witness testimony, and appeals procedures. The guide also addresses white-collar crime, drug offenses, and juvenile criminal law.',
    summary: 'Criminal Law and Defense Strategies summary covering criminal offenses, legal procedures, and defense tactics. Includes information about investigations, trials, and sentencing guidelines.',
    relevance_score: 0.90
  },
  {
    id: 'doc10',
    title: 'Immigration Law and Visa Procedures',
    content: 'Immigration Law and Visa Procedures guide covering visa applications, work permits, permanent residency, naturalization, and deportation defense. This document includes information about family-based immigration, employment-based visas, refugee status, and asylum procedures. Example clause: "Applicants must demonstrate good moral character and meet residency requirements for naturalization." Additional sections cover student visas, investor visas, temporary protected status, and immigration court proceedings. The guide also addresses citizenship requirements and immigration policy changes.',
    summary: 'Immigration Law and Visa Procedures summary covering visa applications, work permits, permanent residency, and naturalization. Includes guidance on family-based and employment-based immigration.',
    relevance_score: 0.85
  }
]

const computeMockRelevance = (doc: Document, query: string): number => {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  let score = doc.relevance_score
  for (const term of terms) {
    if (doc.title.toLowerCase().includes(term) || doc.summary.toLowerCase().includes(term) || doc.content.toLowerCase().includes(term)) {
      score = Math.min(0.99, score + 0.08)
    }
  }
  return Math.round(score * 1000) / 1000
}

const matchesQuery = (doc: Document, query: string): boolean => {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  for (const term of terms) {
    const t = term.replace(/[^a-z0-9]/gi, '')
    if (!t) continue
    if (doc.title.toLowerCase().includes(t) || doc.summary.toLowerCase().includes(t) || doc.content.toLowerCase().includes(t)) return true
    if (doc.title.toLowerCase().includes(t + 's') || doc.summary.toLowerCase().includes(t + 's') || doc.content.toLowerCase().includes(t + 's')) return true
    const stem = t.length > 4 ? t.slice(0, t.length - 1) : t.slice(0, Math.max(3, t.length))
    if (stem && (doc.title.toLowerCase().includes(stem) || doc.summary.toLowerCase().includes(stem) || doc.content.toLowerCase().includes(stem))) return true
  }
  return false
}

const extractSnippet = (text: string, term: string, radius = 60): string => {
  const lower = text.toLowerCase()
  const t = term.toLowerCase().replace(/[^a-z0-9]/gi, '')
  let idx = lower.indexOf(t)
  if (idx === -1) {
    idx = lower.indexOf(t + 's')
  }
  if (idx === -1) return text.slice(0, Math.min(140, text.length))
  const start = Math.max(0, idx - radius)
  const end = Math.min(text.length, idx + t.length + radius)
  return (start > 0 ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { query } = req.body as { query?: string }
  if (typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ error: 'Query must be a non-empty string' })
  }

  const q = query.trim()
  const scored = DOCUMENTS.map(d => ({ ...d, relevance_score: computeMockRelevance(d, q) }))
  const matched = scored.filter((d) => matchesQuery(d, q))
  matched.sort((a, b) => b.relevance_score - a.relevance_score)

  let top = matched.slice(0, 20).map((d) => {
    const terms = q.split(/\s+/).filter(Boolean)
    const term = terms[0] || ''
    return { ...d, snippet: extractSnippet(d.content, term) }
  })

  if (top.length === 0) {
    const fallbackTop = scored.slice().sort((a, b) => b.relevance_score - a.relevance_score).slice(0, 10).map((d) => ({ ...d, snippet: extractSnippet(d.content, q), fallback: true }))
    top = fallbackTop
  }

  return res.json({ documents: top })
}

