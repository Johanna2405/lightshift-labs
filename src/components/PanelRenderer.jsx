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

export default function PanelRenderer({ panel }) {
  const Cmp = registry[panel?.type];
  if (!Cmp) {
    // Fallback: unbekannter Paneltyp (noch nicht implementiert)
    return (
      <section className="rounded-2xl border border-border-600 p-6 bg-bg-800/40">
        <div className="text-text-tertiary text-sm">
          Panel-Typ <code>{String(panel?.type)}</code> ist noch nicht
          implementiert.
        </div>
      </section>
    );
  }
  return <Cmp {...panel} />;
}
