import { PolicyPage } from '../components/policy/PolicyPage.jsx';
import { policy } from '../content/policy.js';

/** The privacy policy (/policy). */
export default function Policy() {
  return <PolicyPage policy={policy} />;
}
