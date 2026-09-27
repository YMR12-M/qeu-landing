import { useLocale } from '../../i18n/useLocale.js';
import { Fridge, IcedCoffee } from '../ui/icons.jsx';
import { CoffeePanel } from './Coffee.jsx';
import { FoodsPanel } from './Foods.jsx';
import styles from './Kitchen.module.css';

// The app's two tabs under «المنتجات الطازجة», in its order.
const TABS = [
  { id: 'foods', Icon: Fridge, Panel: FoodsPanel },
  { id: 'coffee', Icon: IcedCoffee, Panel: CoffeePanel },
];

/**
 * «كيو فودز» and «كيو كوفي» — the meals and the coffee Qeu makes itself — in one section, as
 * the app has them: two tabs under «المنتجات الطازجة». The switch at the top shows one at a
 * time, and the section takes on its surroundings: the fridge against the fresh aisle's white
 * wall, or the café corner's espresso-brown one. Each tab keeps its own drawing (Foods.jsx,
 * Coffee.jsx).
 *
 * The switch is a radio group, as the aisles' signs and the café's menu are, so it works with
 * a keyboard and a screen reader like any form, and without JavaScript: the stylesheet shows
 * the checked tab (:has()). Where :has() isn't known, the switch is left out and the fridge
 * stays.
 */
export function Kitchen() {
  const { t } = useLocale();
  const { kitchen } = t;

  return (
    <section id="kitchen" className={styles.section} aria-labelledby="kitchen-title">
      <div className="container">
        <h2 id="kitchen-title" className="visually-hidden">
          {kitchen.title}
        </h2>
        <fieldset className={styles.switch}>
          <legend className="visually-hidden">{kitchen.legend}</legend>
          <div className={styles.tabs}>
            {TABS.map(({ id, Icon }, index) => (
              <label key={id} className={styles.tab}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="kitchen"
                  value={id}
                  defaultChecked={index === 0}
                />
                <Icon className={styles.icon} />
                {kitchen.tabs[id]}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {TABS.map(({ id, Panel }) => (
        <div key={id} className={styles.panel} data-panel={id}>
          <Panel />
        </div>
      ))}
    </section>
  );
}
