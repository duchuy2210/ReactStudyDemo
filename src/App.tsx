import { useEffect, useState } from 'react';
import { Permissions } from './utils/enum';

//declare array obj
const reviews: {
  name: string;
  image: string;
  stars: number;
  premiumUser: boolean;
  date: string;
}[] = [
  {
    name: 'Evondev',
    image: '',
    stars: 5,
    premiumUser: true,
    date: '05/09/2022',
  },
  {
    name: 'CharkaUI',
    image: '',
    stars: 4,
    premiumUser: false,
    date: '03/08/2022',
  },
  {
    name: 'React Query',
    image: '',
    stars: 3,
    premiumUser: false,
    date: '04/08/2022',
  },
];

//permissions use enum
// enum Permissions {
//   ADMIN,
//   EDITOR,
//   MODERATE
// }


//declare object
const user: {
  firstName: string;
  lastName: string;
  age: number;
  role: "student" | "admin"; //Literal
  isStudent: boolean;
  school: string[];
  score: (number | string)[]; //union Type: có thể là number hoặc string
  contact:[number, string]; //Tuple
  permission: Permissions,
} = {
  firstName: 'Đức Huy',
  lastName: 'Ngô',
  role: 'admin',
  age: 18,
  isStudent: true,
  school: ['Nguyễn Trãi', 'Bách Khoa University'],
  score: [10, 9, 10, 'A+'],
  contact:[0899244434, "dhuy221001@gmail.com"],
  permission: Permissions.ADMIN,
};

//declare with any
const userWithAny: any = {
  firstName: 'Đức Huy',
  lastName: 'Ngô',
  age: 18,
  isStudent: true,
  school: ['Nguyễn Trãi', 'Bách Khoa University'],
  score: [10, 9, 10, 'A+'],
  contact:[0899244434, "dhuy221001@gmail.com"],
  permission: Permissions.ADMIN,
};

function App() {
  const [count, setCount] = useState(0);
  const displayReview = (
    totalReview: number,
    name?: String, //? :optional value
    premium?: boolean
  ) => {
    return (
      <>
        Review total <strong>{totalReview}</strong> | Last reviewed by{' '}
        {reviews.map(review => {
          return (
            <>
              <strong>{review.name}</strong> {review?.premiumUser ? '⭐️' : ''}
            </>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div className="review">
        <div className="review-image">
          <img src="https://source.unsplash.com/random" alt="" />
        </div>
        <div className="review-info">{displayReview(reviews.length)}</div>
      </div>
    </div>
  );
}

export default App;
