
import { createFileRoute } from '@tanstack/react-router';
import CounselorDashboard from '../../pages/counselor/Dashboard';

export const Route = createFileRoute('/counselor/')({
  component: CounselorDashboard
})
