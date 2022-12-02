import Chris from '../images/chris.jpeg';

export const About = () => {
  return (
    <div className="help">
      <div className="banner">
        <img src={Chris} alt="Chris" className="chris" />
        <p>Hello &#038; welcome to my custom dashboard project!</p>
        <p>
          I'm a big fan of data, so I thought it'd be fun to have a play around
          with <b>D3</b>. I learnt a lot with this little project, see below for
          the core bits to look out for on each page.
        </p>
      </div>
      <h2>Top Level</h2>
      <ul>
        <li>
          <b>React.JS</b>
        </li>
        <li>
          <b>D3.JS</b>
        </li>
        <li>
          <b>React Router</b>
        </li>
        <li>
          <b>useState, useEffect</b> used throughout
        </li>
        <li>
          <b>useContext</b> for app state (mainly for mouseover tooltips)
        </li>

        <li>
          <b>Other basic notables:</b> Array methods (reduce, find, filter
          amongst others). Object destructuring.
        </li>
      </ul>
      <h2>Global Population</h2>
      <ul>
        <li>Use the slider in the top left to zoom in & out</li>
        <li>
          <b>SVG manipulation & animation</b>
        </li>
        <li>
          <b>Tooltips</b> - hover over stuff!
        </li>
        <li>
          <b>useMemo</b>, graph calculations were too expensive to recalculate
          for every tooltip state update (moving with the mouse), causing the
          tooltip movement to be jerky. useMemo allowed me to memoise the
          results so the tooltips can keep up with mouse movements.
        </li>
        <li>
          <b>Filter component</b>. The year scale along the bottom filters the
          graph & insights, which then animate to update. Mouseover to filter,
          click to lock in a year after mousing out.
        </li>
      </ul>
      <h2>Customer Success</h2>
      <p>
        Just playing around with other visuals in D3. Seeing what could be done.
      </p>
      <h2>Touch Plan</h2>
      <p>
        A sort of activity tracker, with some KPIs. Each row can be "C, T or E".
        "Contacted, Task or Event". If a row is "contacted" or nothing at all
        selected then its "Task or Event" is overdue.
        <p>
          Different rows are assigned to different people, simple filter
          component at the top, and updating each row to "C, T or E" updates the
          visual and KPI at the top.
        </p>
      </p>
    </div>
  );
};
