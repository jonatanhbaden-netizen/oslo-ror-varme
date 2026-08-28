import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { CallDetailPage } from './pages/CallDetailPage'
import { JobDetailPage } from './pages/JobDetailPage'
import { JobsPage } from './pages/JobsPage'
import { MessageDetailPage } from './pages/MessageDetailPage'
import { MessagesPage } from './pages/MessagesPage'
import { SettingsPage } from './pages/SettingsPage'
import { TodayPage } from './pages/TodayPage'
import { ContactPage } from './site/pages/ContactPage'
import { ForElectriciansPage } from './site/pages/ForElectriciansPage'
import { ForPlumbersPage } from './site/pages/ForPlumbersPage'
import { HowItWorksPage } from './site/pages/HowItWorksPage'
import { SiteHomePage } from './site/pages/SiteHomePage'
import { SiteLayout } from './site/SiteLayout'
import { PlingProvider } from './store/PlingProvider'

export default function App() {
  return (
    <PlingProvider>
      <Routes>
        <Route path="/site" element={<SiteLayout />}>
          <Route index element={<SiteHomePage />} />
          <Route path="slik-fungerer-det" element={<HowItWorksPage />} />
          <Route path="for-rorleggere" element={<ForPlumbersPage />} />
          <Route path="for-elektrikere" element={<ForElectriciansPage />} />
          <Route path="kontakt" element={<ContactPage />} />
        </Route>
        <Route element={<AppShell />}>
          <Route path="/" element={<TodayPage />} />
          <Route path="/beskjeder" element={<MessagesPage />} />
          <Route path="/beskjeder/:id" element={<MessageDetailPage />} />
          <Route path="/oppdrag" element={<JobsPage />} />
          <Route path="/oppdrag/:id" element={<JobDetailPage />} />
          <Route path="/samtaler/:id" element={<CallDetailPage />} />
          <Route path="/innstillinger" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </PlingProvider>
  )
}
