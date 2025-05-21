
import { createFileRoute } from '@tanstack/react-router';
import ReviewApplication from '../../pages/approver/ReviewApplication';

export const Route = createFileRoute('/approver/review/$id')({
  component: ReviewApplication
})
