import React from 'react'

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
}

const categories = [
'All', 'Meet', 'Vegeterian', 'Gril', 'Spicy', 'Other'
];

const Categories: React.FC <CategoriesProps> = React.memo(({value, onChangeCategory}) => {

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li key={index} onClick={() => onChangeCategory(index)} 
            className={value === index ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
})

export default Categories