<script>
import CharacterEntry from "./CharacterEntry.svelte";
import vaiezzellSrc from "$/assets/gallery/art fight 2026/characters/vaiezzell 2026 thumb.png";
import iywralyxSrc from "$/assets/gallery/art fight 2026/characters/iywralyx 2026 thumb.png";
</script>
<character-entries>
    <CharacterEntry
        label="vaiezzell"
        thumbSrc={vaiezzellSrc}
    />

    <CharacterEntry
        label="Iywralyx"
        thumbSrc={iywralyxSrc}
    />
</character-entries>

<style lang="scss">
character-entries {
    display: flex;
    align-items: center;
    justify-content: center;
    
    gap: 1em;
}
</style>