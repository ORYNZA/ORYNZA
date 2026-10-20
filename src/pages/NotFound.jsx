import { Link } from 'react-router-dom';
import { useMeta } from '../lib/useMeta';
import { PageHeader } from '../components/ui';

export default function NotFound() {
  useMeta('Page not found');
  return (
    <PageHeader title="We can't find that page" lead="The link may be old or mistyped. These pages will get you back on track.">
      <p className="hero-actions">
        <Link className="btn btn-sage" to="/">Go to the home page</Link>
        <Link className="btn btn-outline" to="/designs">See our designs</Link>
      </p>
    </PageHeader>
  );
}
