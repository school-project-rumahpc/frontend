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
            {dataList?.map(({category_name,id})=>(
              <li key={id}>
                <a>{category_name}</a>
              </li>
            ))}
          </ul>
        </span>
      <main></main>
    </div>
  );
};

export default Sidebar;
