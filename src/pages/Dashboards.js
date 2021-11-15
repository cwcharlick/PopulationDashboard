import { DashboardProvider } from '../contexts/DashboardContext';
import { GlobalPopulation } from '../dashboards/GlobalPopulation/';
import { TouchPlan } from '../dashboards/TouchPlan';
import { AppContext } from '../contexts/AppContext';
import { ToolTip } from '../utils/ToolTip';
import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Dashboards = () => {
  const [searchParams] = useSearchParams();
  const { toolTip } = useContext(AppContext);

  const d = searchParams.get('d');

  const dashboard = useMemo(
    () => (d === 'touchplan' ? <TouchPlan /> : <GlobalPopulation />),
    [d]
  );

  onmousemove = (e) => {
    if (!toolTip) return;
    const t = document.getElementById('tooltip');
    t.style.left = `${e.clientX + 20}px`;
    t.style.top = `${e.clientY + 20}px`;
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
