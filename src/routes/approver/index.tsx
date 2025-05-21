
import { createFileRoute } from '@tanstack/react-router';
import ApproverDashboard from '../../pages/approver/Dashboard';

export const Route = createFileRoute('/approver/')({
  component: ApproverDashboard
})
