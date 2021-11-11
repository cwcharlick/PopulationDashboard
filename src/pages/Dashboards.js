import { DashboardProvider } from '../contexts/DashboardContext';
import { GlobalPopulation } from '../dashboards/GlobalPopulation';
import { AppContext } from '../contexts/AppContext';
import { ToolTip } from '../utils/ToolTip';
import { useContext } from 'react';

export const Dashboards = () => {
  const { toolTip } = useContext(AppContext);
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
        <DashboardProvider>
          <GlobalPopulation />
        </DashboardProvider>
      </div>

      {showToolTip}
    </>
  );
};
