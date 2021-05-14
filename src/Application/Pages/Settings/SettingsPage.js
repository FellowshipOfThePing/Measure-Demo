import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";

import { PageHeader, SettingsPageSelect } from "../../Components";
import SettingsRoutes from "./SettingsRoutes";

const headerHeight = 75;
const headerMarginBottom = 5;

const SettingsPage = () => {
  const [settingsPageIndex, setSettingsPageIndex] = useState(0);

  return (
    <div className="settings-page-container">
      <PageHeader
        height={headerHeight}
        marginBottom={headerMarginBottom}
        title="Settings"
        readOnly={true}
        substituteIcon={<FiSettings size={20} />}
        leftChildren={
          <SettingsPageSelect
            settingsPageIndex={settingsPageIndex}
            setSettingsPageIndex={setSettingsPageIndex}
          />
        }
      />
      <div
        style={{ height: `calc(100% - ${headerHeight + headerMarginBottom})` }}
      >
        <SettingsRoutes />
      </div>
    </div>
  );
};

export default SettingsPage;
