import { computeTodayStats } from '../lib/stats'
import type { Call, DashboardSnapshot, Job, Message, Tenant } from '../types'

export const DEFAULT_TENANT: Tenant = {
  id: 'oslo-ror-varme',
  name: 'Oslo Rør & Varme',
  phone: '415 84 000',
  city: 'Oslo',
}

function atToday(hours: number, minutes: number, now: Date): string {
  const d = new Date(now)
  d.setHours(hours, minutes, 0, 0)
  return d.toISOString()
}

function inHours(hours: number, minutes: number, now: Date): string {
  const d = new Date(now)
  d.setHours(d.getHours() + hours, minutes, 0, 0)
  return d.toISOString()
}

function inDays(days: number, hours: number, minutes: number, now: Date): string {
  const d = new Date(now)
  d.setDate(d.getDate() + days)
  d.setHours(hours, minutes, 0, 0)
  return d.toISOString()
}

export function seedSnapshot(now = new Date()): DashboardSnapshot {
  const calls: Call[] = [
    {
      id: 'call-ove',
      callerName: 'Ove Nilsen',
      phone: '934 52 187',
      startedAt: atToday(8, 59, now),
      durationSec: 96,
      topic: 'Vannlekkasje',
      summary:
        'Vannlekkasje under kjøkkenbenken. Har stengt stoppekranen selv, men det står vann på gulvet.',
      urgent: true,
      outcome: 'needs_action',
      handledAt: null,
      address: 'Ekebergveien 45, 0192 Oslo',
      jobId: 'job-ove',
    },
    {
      id: 'call-kari',
      callerName: 'Kari Brekke',
      phone: '412 33 901',
      startedAt: atToday(10, 14, now),
      durationSec: 88,
      topic: 'Varmtvannsbereder',
      summary:
        'Ønsker bytte av varmtvannsbereder. Avtalt befaring mandag. Hun er hjemme etter kl. 12.',
      urgent: false,
      outcome: 'booked',
      handledAt: atToday(10, 16, now),
      address: 'Kirkeveien 59, 0364 Oslo',
      jobId: 'job-kari',
    },
    {
      id: 'call-bjorn',
      callerName: 'Bjørn Sætre',
      phone: '412 90 334',
      startedAt: atToday(7, 22, now),
      durationSec: 124,
      topic: 'Tett avløp',
      summary:
        'Tett avløp på badet. Ønsker besøk i neste uke, gjerne tirsdag formiddag. Ikke akutt, men ille lukt.',
      urgent: false,
      outcome: 'needs_action',
      handledAt: null,
      address: 'Trondheimsveien 80, 0565 Oslo',
    },
    {
      id: 'call-lise',
      callerName: 'Lise Holm',
      phone: '900 12 448',
      startedAt: atToday(11, 40, now),
      durationSec: 72,
      topic: 'Gulvvarme',
      summary:
        'Spør når dere kan komme og se på gulvvarme i stua. Fikk beskjed om at noen ringer tilbake i dag.',
      urgent: false,
      outcome: 'info',
      handledAt: atToday(11, 42, now),
      address: 'Mosseveien 12, 0191 Oslo',
    },
    {
      id: 'call-per',
      callerName: 'Per Hagen',
      phone: '481 20 776',
      startedAt: atToday(9, 5, now),
      durationSec: 80,
      topic: 'Pris på rørfornying',
      summary:
        'Ville ha et grovt prisoverslag på rørfornying i kjeller. Fikk beskjed om at tilbud sendes på SMS.',
      urgent: false,
      outcome: 'info',
      handledAt: atToday(9, 8, now),
    },
  ]

  const messages: Message[] = [
    {
      id: 'msg-ove',
      senderName: 'Ove Nilsen',
      phone: '934 52 187',
      sentAt: atToday(8, 59, now),
      text: 'Vannlekkasje, trenger hjelp i dag',
      priority: 'critical',
      handledAt: null,
      address: 'Ekebergveien 45, 0192 Oslo',
    },
    {
      id: 'msg-bjorn',
      senderName: 'Bjørn Sætre',
      phone: '412 90 334',
      sentAt: atToday(2, 55, now),
      text: 'Tett avløp på badet, ønsker besøk i neste uke',
      priority: 'urgent',
      handledAt: null,
      address: 'Trondheimsveien 80, 0565 Oslo',
    },
    {
      id: 'msg-anon',
      senderName: null,
      phone: '478 11 902',
      sentAt: atToday(4, 11, now),
      text: 'Pris på nytt sikringsskap',
      priority: 'normal',
      handledAt: null,
    },
    {
      id: 'msg-lise',
      senderName: 'Lise Holm',
      phone: '900 12 448',
      sentAt: atToday(11, 41, now),
      text: 'Når kan dere komme for å se på gulvvarme i stua?',
      priority: 'normal',
      handledAt: null,
      address: 'Mosseveien 12, 0191 Oslo',
    },
    {
      id: 'msg-morten',
      senderName: 'Morten Dahl',
      phone: '922 67 310',
      sentAt: atToday(6, 18, now),
      text: 'Ingen varme i radiatoren i stua siden i går kveld',
      priority: 'urgent',
      handledAt: null,
      address: 'Sognsveien 22, 0451 Oslo',
    },
    {
      id: 'msg-anne',
      senderName: 'Anne Solberg',
      phone: '991 04 552',
      sentAt: inDays(-1, 16, 40, now),
      text: 'Kan dere bekrefte time for lekkasje på badet neste uke?',
      priority: 'normal',
      handledAt: atToday(8, 10, now),
      address: 'Tøyengata 18, 0190 Oslo',
    },
  ]

  const jobs: Job[] = [
    {
      id: 'job-ove',
      customerName: 'Ove Nilsen',
      phone: '934 52 187',
      startsAt: inHours(38, 23, now),
      address: 'Ekebergveien 45, 0192 Oslo',
      title: 'Bytte varmtvannsbereder',
      notes: 'Kunden har stengt vannet. Ta med standard bereder 200L og dryppklut. Parkering i gården.',
      status: 'confirmed',
    },
    {
      id: 'job-kari',
      customerName: 'Kari Brekke',
      phone: '412 33 901',
      startsAt: inDays(3, 12, 23, now),
      address: 'Kirkeveien 59, 0364 Oslo',
      title: 'Nytt sikringsskap',
      notes: 'Befaring og pris. Hun er hjemme etter kl. 12. Ring 15 min før.',
      status: 'confirmed',
    },
    {
      id: 'job-erik',
      customerName: 'Erik Næss',
      phone: '908 44 120',
      startsAt: inDays(4, 9, 0, now),
      address: 'Hoffsveien 4, 0275 Oslo',
      title: 'Service på varmeanlegg',
      notes: 'Årlig service. Fyrrom i kjeller, nøkkel i postkasse etter avtale.',
      status: 'scheduled',
    },
    {
      id: 'job-anne',
      customerName: 'Anne Solberg',
      phone: '991 04 552',
      startsAt: inDays(6, 14, 30, now),
      address: 'Tøyengata 18, 0190 Oslo',
      title: 'Lekkasje på bad',
      notes: 'Venter på at kunden bekrefter tidspunkt. Ikke stengt vann ennå.',
      status: 'unconfirmed',
    },
  ]

  return {
    tenant: { ...DEFAULT_TENANT },
    calls,
    messages,
    jobs,
    stats: computeTodayStats(calls),
    source: 'mock',
  }
}
