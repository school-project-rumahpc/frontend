import Styles from '../../styles/catalog.module.css';

const Sidebar = ({ dataList }) => {
  return (
    <div className={Styles.sidebar}>
      <header className={Styles.title}>
        <p>Category</p>
      </header>
      <span>
          <ul>
            <li>
              <a>all</a>
            </li>
            {/* some Category */}
          </ul>
        </span>
      <main></main>
    </div>
  );
};

export default Sidebar;
