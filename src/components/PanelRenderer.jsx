// Import der einzelnen Panel-Komponenten
import TeamIntroPanel from "./panels/TeamIntroPanel.jsx";
import MetricsPanel from "./panels/MetricsPanel.jsx";
import CommunityBubblesPanel from "./panels/CommunityBubblesPanel.jsx";
import PodcastPanel from "./panels/PodcastPanel.jsx";
import LogoGridPanel from "./panels/LogoGridPanel.jsx";
import InfographicMultiLayerPanel from "./panels/InfographicMultiLayerPanel.jsx";
import TeamExpansionPanel from "./panels/TeamExpansionPanel.jsx";
import RoadmapPanel from "./panels/RoadmapPanel.jsx";
import ArvrModelViewerPanel from "./panels/ArvrModelViewerPanel.jsx";
import FeaturePollPanel from "./panels/FeaturePollPanel.jsx";

// Registry-Objekt, dass alle verfügbaren Paneltypen über ihre "type"-Bezeichnung mit der zugehörigen React-Komponente verknüpft
const registry = {
  teamIntro: TeamIntroPanel,
  metrics: MetricsPanel,
  communityBubbles: CommunityBubblesPanel,
  podcast: PodcastPanel,
  featurePoll: FeaturePollPanel,
  arvr: ArvrModelViewerPanel,
  logoGrid: LogoGridPanel,
  infographic: InfographicMultiLayerPanel,
  teamExpansion: TeamExpansionPanel,
  roadmap: RoadmapPanel,
};

// Zentrale Komponente, die entscheidet, welche Panel-Komponente gerendert wird
export default function PanelRenderer({ panel }) {
  // Ermittelt anhand des Typs die passende Komponente aus dem Registry-Objekt
  const Cmp = registry[panel?.type];

  // Falls der Typ unbekannt ist oder keine Komponente vorhanden ist:
  // Rückgabe eines Fallback-Elements mit Hinweistext
  if (!Cmp) {
    return (
      <section className="rounded-2xl border border-border-600 p-6 bg-bg-800/40">
        <div className="text-text-tertiary text-sm">
          Panel-Typ <code>{String(panel?.type)}</code> ist noch nicht
          implementiert.
        </div>
      </section>
    );
  }

  // Rendert die passende Panel-Komponente und übergibt ihr alle Inhalte aus der JSON-Datei
  return <Cmp {...panel} />;
}
