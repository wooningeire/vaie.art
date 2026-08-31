<script lang="ts">
import SocialLink from "@/SocialButton.svelte";

import GithubSvg from "@/social-icons/Github.svg.svelte";
import KofiSvg from "@/social-icons/Kofi.svg.svelte";
import ArtfightSvg from "@/social-icons/Artfight.svg.svelte";
import BlueskySvg from "@/social-icons/Bluesky.svg.svelte";
</script>

<social-links-concise>
    <SocialLink
        href="https://github.com/wooningeire"
        label="GitHub"
    >
        {#snippet icon()}
            <GithubSvg />
        {/snippet}
    </SocialLink>

    <SocialLink
        href="https://ko-fi.com/vaiezzell"
        label="Ko-fi"
    >
        {#snippet icon()}
            <KofiSvg />
        {/snippet}
    </SocialLink>

    <SocialLink
        href="https://artfight.net/~vaiezzell"
        label="Art Fight"
    >
        {#snippet icon()}
            <ArtfightSvg />
        {/snippet}
    </SocialLink>

    <SocialLink
        href="https://bsky.app/profile/vaie.art"
        label="Bluesky"
    >
        {#snippet icon()}
            <BlueskySvg />
        {/snippet}
    </SocialLink>
</social-links-concise>

<style lang="scss">
social-links-concise {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(2, 1fr);
    grid-auto-columns: 1fr;
    place-items: stretch;
    gap: 0.5em;
    
    :global(path) {
        fill: currentcolor;
    }
}
</style>