import { useEffect, useState } from 'react';

export const ToolTip = (props) => {
  const [content, setContent] = useState({ children: '', title: '' });

  useEffect(() => {
    props.title && setContent({ children: props.children, title: props.title });
  }, [props]);

  return (
    <div
      id="tooltip"
      className="tooltip"
      style={{
        position: 'absolute',
        opacity: props.visible ? 1 : 0,
      }}
    >
      <h2>{content.title}</h2>
      {content.children ? <p>{content.children}</p> : ''}
    </div>
  );
};
