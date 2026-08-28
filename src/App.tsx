import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { CallDetailPage } from './pages/CallDetailPage'
import { JobDetailPage } from './pages/JobDetailPage'
import { JobsPage } from './pages/JobsPage'
import { MessageDetailPage } from './pages/MessageDetailPage'
import { MessagesPage } from './pages/MessagesPage'
import { SettingsPage } from './pages/SettingsPage'
import { TodayPage } from './pages/TodayPage'
import { PlingProvider } from './store/PlingProvider'

export default function App() {
  return (
    <PlingProvider>
      <Routes>
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
