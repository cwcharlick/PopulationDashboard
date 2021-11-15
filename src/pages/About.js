import Chris from '../images/chris.jpeg';

export const About = () => {
  return (
    <div className="help">
      <div className="banner">
        <img src={Chris} alt="Chris" className="chris" />
        <p>Hello &#038; welcome to my custom dashboard project!</p>
        <p>
          I'm a firm believer in control. It's always quicker to get up and
          running with a high level option (such as Tableau), but for business
          critical tools which affect daily productivity of an entire team it's
          simply more important to "get it right" than to "get it quickly".
        </p>
        <p>
          These dashboards are mainly built with Javascript, React.JS and D3.JS.
          Importantly this allows complete control over every aspect. There are
          a couple of different types of dashboard, so I've displayed 2 here.
        </p>
      </div>
      <h2>Global Population</h2>
      <p>
        The first shows some visualisations and KPI style stats on Global
        Population. This is merely a technical demo of the benefits of using D3
        + React over high level tools such as Tableau. You have complete control
        over components and interactivity, including animations (which can help
        readability) and any kind of custom filters.
      </p>
      <p>
        Mouse over to preview, or click to lock in, a different year from the
        year-filter component at the bottom to instantly see the entire
        dashboard's visuals and KPIs update.
      </p>
      <h2>Touch Plan</h2>
      <p>
        Secondly we have a completely different type of "dashboard" which I
        refer to as a "tool". Highly Customer Success specific, the Touch Plan
        creates a kind of dashboard / report which Customer Success Managers can
        use to keep on top of their proactive outreach.
      </p>
      <p>
        It pulls account and activity (Event and Task) data from a CRM. From
        these we can see which specific accounts are due, or overdue, and even
        the type of outreach they need (Eg. within first 90 days? They need a
        second or third on-boarding catch out. Outside the first 90 days?
        They're due a QBR.)
      </p>
      <p>
        The Touch Plan can either (or both) update automatically from new
        activities logged in the CRM, or can even allow the CSMs to record their
        activity here and it will automatically update the CRM itself.
      </p>
      <p>
        If you don't already use a touch plan, it's a game changer for CSMs.
      </p>
    </div>
  );
};
