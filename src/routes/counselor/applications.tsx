
import { createFileRoute } from '@tanstack/react-router';
import ApplicationsList from '../../pages/counselor/ApplicationsList';

export const Route = createFileRoute('/counselor/applications')({
  component: ApplicationsList
})
