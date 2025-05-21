
import { createFileRoute } from '@tanstack/react-router';
import PendingApplications from '../../pages/approver/PendingApplications';

export const Route = createFileRoute('/approver/pending')({
  component: PendingApplications
})
