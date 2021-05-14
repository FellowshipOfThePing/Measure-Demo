import React, { useContext, useEffect, useRef, useState } from "react";
import { FiDatabase } from "react-icons/fi";
import { useHistory } from "react-router";

import "../../CSS/syntax.css";
import "../../CSS/style.css";
import "./DataSourcesPage.css";
import Sources from "./Sources";
import { useWindowSize } from "../../../Hooks";
import {
  DataSourceCard,
  PageHeader,
  BrandIcons,
  NotificationCard,
} from "../../Components";
import { GlobalStateContext } from "../../../Context";
import Routes from "../../../Routes";
import { toTitleCase } from "../../../utils";

const cardWidth = 244;
const cardMargin = 8;
const headerHeight = 75;
const headerMarginBottom = 5;

const DataSourcesPage = () => {
  const {
    integrationList,
    notifCardOpen,
    setNotifCardOpen,
    notifCardBrand,
    notifCardStatus,
  } = useContext(GlobalStateContext);

  const [cards, setCards] = useState([]);

  // Card Grid Controls
  const [cardsPerRow, setCardsPerRow] = useState(null);
  const [numRows, setNumRows] = useState(null);
  const [rows, setRows] = useState(null);
  let windowSize = useWindowSize();
  let pageRef = useRef(null);
  let history = useHistory();

  useEffect(() => {
    let activeSources = integrationList.map(
      (source) => source.source_type_name
    );
    let inactiveSources = Object.keys(Sources).filter(
      (source) => !activeSources.includes(source)
    );

    let activeIntegrations = integrationList.map(
      ({ source_type_name, status }, index) => ({
        title: toTitleCase(source_type_name),
        subtitle: Sources[source_type_name.toLowerCase()].subtitle,
        cardIcon: BrandIcons[source_type_name.toLowerCase()],
        status: status,
        waitingPage:
          source_type_name.toLowerCase() === "google analytics"
            ? Routes.GOOGLE_PAGE
            : null,
      })
    );
    let inactiveIntegrations = inactiveSources.map((source, index) => ({
      title: toTitleCase(source),
      subtitle: Sources[source].subtitle,
      cardIcon: BrandIcons[source.toLowerCase()],
      status: Sources[source.toLowerCase()].enabled ? "ADDABLE" : null,
      link: Sources[source.toLowerCase()].oauthLink,
    }));

    setCards(activeIntegrations.concat(inactiveIntegrations));
  }, [integrationList]);

  useEffect(() => {
    if (cards.length > 0) {
      setCardsPerRow(
        Math.floor(pageRef.current.offsetWidth / (cardWidth + cardMargin * 2))
      );
    }
  }, [windowSize, cards]);

  useEffect(() => {
    if (cardsPerRow && cards.length > 0) {
      setNumRows(Math.ceil(cards.length / cardsPerRow));
    }
  }, [cardsPerRow]);

  useEffect(() => {
    if (numRows) {
      setRows(new Array(numRows).fill(""));
    }
  }, [numRows]);

  return (
    <div className="sources-page-container">
      <PageHeader
        height={headerHeight}
        marginBottom={headerMarginBottom}
        title="Data Sources"
        descriptionVisible={true}
        description="Manage all of your data integrations"
        readOnly={true}
        substituteIcon={<FiDatabase size={20} />}
      />
      <div
        ref={pageRef}
        className="sources-page-body"
        style={{ height: `calc(100% - ${headerHeight + headerMarginBottom})` }}
      >
        {rows &&
          rows.map((_, rowIndex) => (
            <div className="source-card-row" key={rowIndex}>
              {cards &&
                cards
                  .slice(
                    rowIndex * cardsPerRow,
                    rowIndex * cardsPerRow + cardsPerRow
                  )
                  .map((props, index) => (
                    <div
                      key={props.status + rowIndex + index}
                      style={{
                        marginRight:
                          index !== cardsPerRow - 1
                            ? `${cardMargin * 2}px`
                            : null,
                      }}
                    >
                      <DataSourceCard
                        onClickWaiting={() => history.push(props.waitingPage)}
                        {...props}
                      />
                    </div>
                  ))}
            </div>
          ))}
      </div>
      {notifCardOpen && (
        <div style={{ position: "absolute", right: "30px", bottom: "30px" }}>
          <NotificationCard
            brand={notifCardBrand}
            status={notifCardStatus}
            setOpen={setNotifCardOpen}
          />
        </div>
      )}
    </div>
  );
};

export default DataSourcesPage;
