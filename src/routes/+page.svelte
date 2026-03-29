<script lang="ts">
import Background from "@/Background.svelte";
import Gallery from "@/Gallery.svelte";
import SocialLink from "@/SocialButton.svelte";
import BareLink from "@/BareLink.svelte";

import GithubSvg from "@/social-icons/Github.svg.svelte";
import KofiSvg from "@/social-icons/Kofi.svg.svelte";
import ArtfightSvg from "@/social-icons/Artfight.svg.svelte";
import BlueskySvg from "@/social-icons/Bluesky.svg.svelte";
</script>

<page-contents>
    <Background />

    <main>
        <Gallery />

        <background-credit>
            Background art by <BareLink href="https://www.furaffinity.net/view/61807537/">Sapphi</BareLink>
        </background-credit>

        <biography-section>
            <biography-title>
                <h1>vaiezzell</h1>

                <title-headline>software dragon ΘΔ!</title-headline>
                <title-headline>digital media generalist!</title-headline>
                <title-headline>macro dragon enjoyer!</title-headline>
            </biography-title>

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
        </biography-section>
    </main>
</page-contents>


<style lang="scss">
page-contents {
    display: grid;
    place-items: center;

    :global(> *) {
        grid-area: 1/1;
    }
}

main {
    display: grid;
    grid-template-rows: 1fr auto;

    padding: 2rem;

    width: 100vw;
    height: 100vh;
    min-width: 300px;
    min-height: 300px;

    @media (min-width: 720px) {
        font-size: 1.5rem;
    }
    
    > :global(project-gallery) {
        grid-area: 1/1 / 2/3;
    }
}

background-credit {
    grid-area: 2/1;

    align-self: flex-end;
    justify-self: flex-start;
}

biography-section {
    align-self: flex-end;
    justify-self: flex-end;

    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
}

biography-title {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
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