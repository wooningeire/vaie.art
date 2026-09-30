<script lang="ts">
import SocialLink from "@/SocialButton.svelte";

import GithubSvg from "@/social-icons/Github.svg.svelte";
import KofiSvg from "@/social-icons/Kofi.svg.svelte";
import ArtfightSvg from "@/social-icons/Artfight.svg.svelte";
import BlueskySvg from "@/social-icons/Bluesky.svg.svelte";
    import Sep from "#/routes/Sep.svelte";
</script>

<social-links>
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

    <sep-vertical>
        <Sep />
    </sep-vertical>

    <sep-horizontal>
        <Sep />
    </sep-horizontal>
</social-links>

<style lang="scss">
social-links {
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: 1fr;
    grid-auto-rows: 1px 1fr;
    grid-template-columns: 1fr 1px 1fr;
    place-items: stretch;

    > sep-vertical {
        display: grid;
        place-items: stretch;
        grid-area: 1/2 / 4/3;
    }

    > sep-horizontal {
        display: grid;
        place-items: stretch;
        grid-area: 2/1 / 3/-1;
    }
    
    :global(path) {
        fill: currentcolor;
    }
}
</style>