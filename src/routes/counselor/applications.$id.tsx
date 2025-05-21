
import { createFileRoute } from '@tanstack/react-router';
import ApplicationDetail from '../../pages/counselor/ApplicationDetail';

export const Route = createFileRoute('/counselor/applications/$id')({
  component: ApplicationDetail
})
