import { PolicyPage } from '../components/policy/PolicyPage.jsx';
import { policy } from '../content/policy-en.js';

/** The privacy policy in English (/policy-english). */
export default function PolicyEnglish() {
  return <PolicyPage policy={policy} />;
}
