---
title: What a 10-year TCO model shows that a 3-year model hides
description: SDN and NFV business cases often flip once hardware refresh, OSS/BSS integration and operations are counted over the real life of the network.
date: 2026-09-15
topics: [SDN/NFV, Business case]
---

A three-year total cost of ownership model for network virtualization usually looks good. Hardware spend drops, vendor lock-in loosens, and the slide shows savings by year two. Stretch the same model to ten years and the picture changes, sometimes for the better and sometimes not.

When we modeled an SDN/NFV use case for Verizon, the analysis covered wireless, wireline, core and OSS/BSS over ten years. That horizon matters for three reasons.

## Hardware refresh only shows up in long models

Purpose-built network hardware is typically replaced on a multi-year cycle. A three-year model often captures the purchase of new commodity servers but not the second refresh of the legacy platform you are avoiding. The avoided refresh is frequently the biggest saving in the whole case. Leave it out and virtualization looks marginal. Count it and the case can be strong.

## Software and integration costs move, they do not disappear

Virtualization shifts spend from boxes to software licences, cloud infrastructure and integration. The integration line is the one that grows quietly. Each virtual network function has to be onboarded, tested against the cloud platform, and connected to orchestration and assurance. Upgrades repeat that work. A long horizon forces you to price the upgrade cadence, not just the first deployment.

## OSS/BSS is where the savings are won or lost

The operational savings in a virtualization case depend on automation: faster provisioning, fewer truck rolls, fewer manual changes. Those savings only arrive if the OSS/BSS stack can drive the new platform. If it cannot, operations teams run two worlds in parallel and the opex line goes up, not down. Including OSS/BSS in scope is what makes the model honest.

## How to build the model

- **Use the asset's real life.** Match the horizon to the refresh cycles of the platforms involved, not to a budget cycle.
- **Separate one-time and recurring integration.** Price onboarding once and upgrades every cycle.
- **Model the transition.** Years with both legacy and virtual platforms in service are the expensive ones.
- **Run sensitivities on the few numbers that matter.** Usually that is licence pricing, automation rate and the timing of legacy retirement.

A long model is more work and has more uncertainty in the outer years. It is still the only version that tells you whether the decision pays back over the life of the network you are actually building.
