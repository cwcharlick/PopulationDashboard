import { DashboardProvider } from '../contexts/DashboardContext';
import { GlobalPopulation } from '../dashboards/GlobalPopulation/';
import { CustomerSuccess } from '../dashboards/CustomerSuccess';
import { TouchPlan } from '../dashboards/TouchPlan';
import { AppContext } from '../contexts/AppContext';
import { ToolTip } from '../utils/ToolTip';
import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Dashboards = () => {
  const [searchParams] = useSearchParams();
  const { toolTip } = useContext(AppContext);

  const d = searchParams.get('d');

  const dashboard = useMemo(() => {
    if (d === 'touchplan') return <TouchPlan />;
    if (d === 'cs') return <CustomerSuccess />;
    return <GlobalPopulation />;
  }, [d]);

  onmousemove = (e) => {
    if (!toolTip) return;
    const t = document.getElementById('tooltip');
    t.style.left = `${e.pageX + 20}px`;
    t.style.top = `${e.pageY + 20}px`;
  };

  const showToolTip = (
    <ToolTip
      title={toolTip && toolTip.title}
      left={toolTip && toolTip.x}
      top={toolTip && toolTip.y}
      visible={toolTip}
    >
      {toolTip && toolTip.content}
    </ToolTip>
  );
  return (
    <>
      <div className="content">
        <DashboardProvider>{dashboard}</DashboardProvider>
      </div>

      {showToolTip}
    </>
  );
};
