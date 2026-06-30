<script lang="ts">
import SocialLink from "@/SocialButton.svelte";
import BareLink from "@/BareLink.svelte";

import GithubSvg from "@/social-icons/Github.svg.svelte";
import KofiSvg from "@/social-icons/Kofi.svg.svelte";
import ArtfightSvg from "@/social-icons/Artfight.svg.svelte";
import BlueskySvg from "@/social-icons/Bluesky.svg.svelte";
</script>

<biography-section>
    <biography-title>
        <h1>vaiezzell</h1>

        <title-headline>software dragon ΘΔ!</title-headline>
        <title-headline>digital media generalist!</title-headline>
        <title-headline>macro dragon enjoyer!</title-headline>
    </biography-title>

    <background-credit>
        Background art by <BareLink href="https://www.furaffinity.net/view/61807537/">Sapphi</BareLink>
    </background-credit>

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

<style lang="scss">
@use "$/styles/colors.scss";

biography-section {
    align-self: flex-end;
    justify-self: flex-end;

    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 1em;

    padding-bottom: 1em;

    font-size: 1.5rem;

    @media (min-width: 720px) {
        width: 100%;
        padding-top: 1em;
        border-top: 1px solid oklch(0.9 0.02 200 / 0.25);
    }
}

biography-title {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 0.25em;
}

title-headline {
    color: colors.$emph;
}

background-credit {
    font-size: 0.75em;
}

social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    justify-content: flex-end;

    :global(path) {
        fill: currentcolor;
    }
}
</style>