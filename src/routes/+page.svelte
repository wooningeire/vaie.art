<script lang="ts">
import Gallery from "@/Gallery.svelte";
import SocialLink from "@/SocialLink.svelte";

import GithubSvg from "@/social-icons/Github.svg.svelte";
import KofiSvg from "@/social-icons/Kofi.svg.svelte";
import ArtfightSvg from "@/social-icons/Artfight.svg.svelte";
import BlueskySvg from "@/social-icons/Bluesky.svg.svelte";
</script>

<main>
    <Gallery />

    <page-title>
        <h1>vaiezzell</h1>


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
                href="https://bsky.app/profile/vaiezzell.bsky.social"
                label="Bluesky"
            >
                {#snippet icon()}
                    <BlueskySvg />
                {/snippet}
            </SocialLink>
        </social-links>
    </page-title>
</main>


<style lang="scss">
main {
    display: grid;

    padding: 2rem;

    width: 100vw;
    height: 100vh;
    min-width: 300px;
    min-height: 300px;
}

page-title {
    align-self: flex-end;
    justify-self: flex-end;

    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;

    @media (min-width: 720px) {
        font-size: 1.5rem;
    }
}

social-links {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: flex-end;

    :global(path) {
        fill: currentcolor;
    }
}
</style>