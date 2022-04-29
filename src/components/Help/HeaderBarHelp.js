import React from 'react';
import Marquee from 'react-fast-marquee';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function HeaderBarHelp() {
  const { list } = useSelector(state => state.help);

  return (
    <div>
      <Marquee
        pauseOnHover
        pauseOnClick
        gradient={false}
        style={{ backgroundColor: 'white', height: 30 }}
      >
        {list.map((item, index) => (
          <Link
            to={`/help/${item._id}`}
            key={index}
            style={{ marginInline: 100 }}
          >
            {item.userId.fullname} - đang ở gần bạn và gặp sự số{' '}
            {item.type && `về ${item.type}`} -{' '}
            {item.state.length === 0
              ? 'Chưa có ai giúp đỡ'
              : `Đã có ${item.state.length} người giúp`}
          </Link>
        ))}
      </Marquee>
    </div>
  );
}
