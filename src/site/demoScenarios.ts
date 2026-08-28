import type { Call, Job, Message } from '../types'

export type Trade = 'ror' | 'elektro'

export type DemoLine = {
  speaker: 'pling' | 'kunde'
  text: string
}

export type DemoScenario = {
  id: string
  trade: Trade
  label: string
  tenantName: string
  exampleNote: string
  lines: DemoLine[]
  call: Call
  message: Message
  job: Job
}

function hoursFromNow(hours: number): string {
  const d = new Date()
  d.setHours(d.getHours() + hours, 0, 0, 0)
  return d.toISOString()
}

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString()
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'ror-lekkasje',
    trade: 'ror',
    label: 'Vannlekkasje i dag',
    tenantName: 'Bergen Rør AS',
    exampleNote: 'Eksempeldata. Ikke en ekte kunde.',
    lines: [
      { speaker: 'pling', text: 'Bergen Rør, du snakker med Pling.' },
      { speaker: 'kunde', text: 'Det lekker under kjøkkenbenken. Jeg trenger hjelp i dag.' },
      { speaker: 'pling', text: 'Jeg hører det. Har du fått stengt stoppekranen?' },
      { speaker: 'kunde', text: 'Ja, men det står vann på gulvet. Jeg heter Ove Nilsen.' },
      { speaker: 'pling', text: 'Takk, Ove. Jeg sender dette videre som akutt og ber rørleggeren ringe deg.' },
    ],
    call: {
      id: 'demo-call-ove',
      callerName: 'Ove Nilsen',
      phone: '934 52 187',
      startedAt: minutesAgo(2),
      durationSec: 96,
      topic: 'Vannlekkasje',
      summary:
        'Vannlekkasje under kjøkkenbenken. Har stengt stoppekranen selv, men det står vann på gulvet.',
      urgent: true,
      outcome: 'needs_action',
      handledAt: null,
      address: 'Fjellveien 3, 5019 Bergen',
      jobId: 'demo-job-ove',
    },
    message: {
      id: 'demo-msg-ove',
      senderName: 'Ove Nilsen',
      phone: '934 52 187',
      sentAt: minutesAgo(2),
      text: 'Vannlekkasje, trenger hjelp i dag',
      priority: 'critical',
      handledAt: null,
      address: 'Fjellveien 3, 5019 Bergen',
    },
    job: {
      id: 'demo-job-ove',
      customerName: 'Ove Nilsen',
      phone: '934 52 187',
      startsAt: hoursFromNow(3),
      address: 'Fjellveien 3, 5019 Bergen',
      title: 'Vannlekkasje under kjøkkenbenk',
      notes: 'Akutt. Kunden har stengt vannet. Ta med slukpumpe.',
      status: 'confirmed',
    },
  },
  {
    id: 'ror-avlop',
    trade: 'ror',
    label: 'Tett avløp neste uke',
    tenantName: 'Bergen Rør AS',
    exampleNote: 'Eksempeldata. Ikke en ekte kunde.',
    lines: [
      { speaker: 'pling', text: 'Bergen Rør, Pling her. Hva kan jeg hjelpe med?' },
      { speaker: 'kunde', text: 'Tett avløp på badet. Ikke krise, men det lukter.' },
      { speaker: 'pling', text: 'Skjønner. Passer det med besøk i neste uke?' },
      { speaker: 'kunde', text: 'Ja, gjerne tirsdag formiddag. Bjørn Sætre.' },
      { speaker: 'pling', text: 'Da booker jeg det og legger igjen beskjed til rørleggeren.' },
    ],
    call: {
      id: 'demo-call-bjorn',
      callerName: 'Bjørn Sætre',
      phone: '412 90 334',
      startedAt: minutesAgo(8),
      durationSec: 124,
      topic: 'Tett avløp',
      summary: 'Tett avløp på badet. Ønsker besøk i neste uke, gjerne tirsdag formiddag.',
      urgent: false,
      outcome: 'booked',
      handledAt: minutesAgo(7),
      address: 'Løbergsveien 21, 5055 Bergen',
      jobId: 'demo-job-bjorn',
    },
    message: {
      id: 'demo-msg-bjorn',
      senderName: 'Bjørn Sætre',
      phone: '412 90 334',
      sentAt: minutesAgo(8),
      text: 'Tett avløp på badet, ønsker besøk i neste uke',
      priority: 'urgent',
      handledAt: null,
      address: 'Løbergsveien 21, 5055 Bergen',
    },
    job: {
      id: 'demo-job-bjorn',
      customerName: 'Bjørn Sætre',
      phone: '412 90 334',
      startsAt: hoursFromNow(72),
      address: 'Løbergsveien 21, 5055 Bergen',
      title: 'Tett avløp på bad',
      notes: 'Ikke akutt. Kunden er hjemme tirsdag formiddag.',
      status: 'confirmed',
    },
  },
  {
    id: 'elektro-skap',
    trade: 'elektro',
    label: 'Pris på sikringsskap',
    tenantName: 'Oslo Elektro AS',
    exampleNote: 'Eksempeldata. Ikke en ekte kunde.',
    lines: [
      { speaker: 'pling', text: 'Oslo Elektro, du snakker med Pling.' },
      { speaker: 'kunde', text: 'Kan jeg få pris på nytt sikringsskap?' },
      { speaker: 'pling', text: 'Det kan vi. Er det utløste kurser, eller vil du bytte hele skapet?' },
      { speaker: 'kunde', text: 'Hele skapet. Gammelt og fullt. Jeg oppga ikke navn.' },
      { speaker: 'pling', text: 'Greit. Jeg legger inn en beskjed, så ringer elektriker tilbake med time for befaring.' },
    ],
    call: {
      id: 'demo-call-skap',
      callerName: null,
      phone: '478 11 902',
      startedAt: minutesAgo(4),
      durationSec: 80,
      topic: 'Sikringsskap',
      summary: 'Vil ha pris på nytt sikringsskap. Ikke akutt. Ønsker tilbakeringing.',
      urgent: false,
      outcome: 'needs_action',
      handledAt: null,
    },
    message: {
      id: 'demo-msg-skap',
      senderName: null,
      phone: '478 11 902',
      sentAt: minutesAgo(4),
      text: 'Pris på nytt sikringsskap',
      priority: 'normal',
      handledAt: null,
    },
    job: {
      id: 'demo-job-skap',
      customerName: 'Oppga ikke navn',
      phone: '478 11 902',
      startsAt: hoursFromNow(48),
      address: 'Tøyengata 18, 0190 Oslo',
      title: 'Befaring sikringsskap',
      notes: 'Prisforespørsel. Avtal tid før oppmøte.',
      status: 'unconfirmed',
    },
  },
  {
    id: 'elektro-strom',
    trade: 'elektro',
    label: 'Ingen strøm i stua',
    tenantName: 'Oslo Elektro AS',
    exampleNote: 'Eksempeldata. Ikke en ekte kunde.',
    lines: [
      { speaker: 'pling', text: 'Oslo Elektro, Pling her.' },
      { speaker: 'kunde', text: 'Ingen strøm i stua siden i går kveld. Lise Holm.' },
      { speaker: 'pling', text: 'Har sikringen gått, eller er hele kursen død?' },
      { speaker: 'kunde', text: 'Kursen er død. Resten av leiligheten virker.' },
      { speaker: 'pling', text: 'Da tar jeg det som haster. Elektriker får navn, nummer og adresse nå.' },
    ],
    call: {
      id: 'demo-call-lise',
      callerName: 'Lise Holm',
      phone: '900 12 448',
      startedAt: minutesAgo(1),
      durationSec: 72,
      topic: 'Ingen strøm',
      summary: 'Ingen strøm i stua siden i går. Resten av leiligheten virker. Kursen er død.',
      urgent: true,
      outcome: 'needs_action',
      handledAt: null,
      address: 'Kirkeveien 59, 0364 Oslo',
      jobId: 'demo-job-lise',
    },
    message: {
      id: 'demo-msg-lise',
      senderName: 'Lise Holm',
      phone: '900 12 448',
      sentAt: minutesAgo(1),
      text: 'Ingen strøm i stua siden i går kveld',
      priority: 'urgent',
      handledAt: null,
      address: 'Kirkeveien 59, 0364 Oslo',
    },
    job: {
      id: 'demo-job-lise',
      customerName: 'Lise Holm',
      phone: '900 12 448',
      startsAt: hoursFromNow(5),
      address: 'Kirkeveien 59, 0364 Oslo',
      title: 'Død kurs i stue',
      notes: 'Haster. Sjekk kurs og jordfeil. Kunden er hjemme i dag.',
      status: 'scheduled',
    },
  },
]
