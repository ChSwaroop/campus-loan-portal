
import { createFileRoute } from '@tanstack/react-router';
import NewApplication from '../../pages/counselor/NewApplication';

export const Route = createFileRoute('/counselor/new-application')({
  component: NewApplication
})
