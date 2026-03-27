import { useMemo, useState } from "react";

import { builtInPresets } from "../lib/presets";
import type { DashboardViewPreset } from "../types";

interface PresetControlsProps {
  customPresets: DashboardViewPreset[];
  onApplyPreset: (presetId: string) => void;
  onSavePreset: (name: string) => void;
}

export function PresetControls({
  customPresets,
  onApplyPreset,
  onSavePreset,
}: Readonly<PresetControlsProps>) {
  const [name, setName] = useState("");

  const options = useMemo(
    () => [...builtInPresets, ...customPresets],
    [customPresets],
  );

  return (
    <section className="preset-panel" aria-label="View presets">
      <h2>View presets</h2>
      <div className="preset-actions">
        <label>
          Apply preset
          <select
            onChange={(event) => onApplyPreset(event.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select a preset
            </option>
            {options.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
        </label>
        <form
          className="preset-save"
          onSubmit={(event) => {
            event.preventDefault();
            if (!name.trim()) {
              return;
            }
            onSavePreset(name.trim());
            setName("");
          }}
        >
          <label>
            Save current view
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Preset name"
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </section>
  );
}
