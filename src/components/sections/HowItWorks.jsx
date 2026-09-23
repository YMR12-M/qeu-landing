import { media } from '../../content/media.js';
import { useLocale } from '../../i18n/useLocale.js';
import { Picture } from '../ui/Picture.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';
import styles from './HowItWorks.module.css';

/**
 * «كيف يشتغل» — kept from the previous design, set in v3 type. Three steps from the
 * Google Play description, each with the matching screen; takes v3's "inside the app" slot.
 */
export function HowItWorks() {
  const { t } = useLocale();
  const { inside } = t;

  return (
    <section id="inside" className={styles.section} aria-labelledby="inside-title">
      <div className="container">
        <SectionHeading
          id="inside-title"
          eyebrow={inside.eyebrow}
          title={inside.title}
          lead={inside.lead}
        />

        <ol className={styles.steps} role="list">
          {inside.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.id}
              className={styles.step}
              data-step={step.id}
              delay={index * 120}
            >
              <div className={styles.frame}>
                <Picture
                  image={media.steps[step.id]}
                  alt={step.imageAlt}
                  sizes="(min-width: 64em) 26vw, (min-width: 48em) 30vw, 9rem"
                  className={styles.image}
                />
              </div>
              <div className={styles.copy}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
