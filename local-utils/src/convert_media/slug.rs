use unicode_normalization::UnicodeNormalization;
use unicode_normalization::char::is_combining_mark;

pub fn create_slug_from_path_segment(value: &str) -> String {
    let mut slug = String::new();
    let mut previous_was_separator = true;

    for character in value.nfkd().flat_map(char::to_lowercase) {
        if is_combining_mark(character) {
            continue;
        }

        if character == '&' {
            push_separator(&mut slug, &mut previous_was_separator);
            slug.push_str("and");
            previous_was_separator = false;
            push_separator(&mut slug, &mut previous_was_separator);
            continue;
        }

        if character.is_ascii_alphanumeric() {
            slug.push(character);
            previous_was_separator = false;
            continue;
        }

        push_separator(&mut slug, &mut previous_was_separator);
    }

    let trimmed = slug.trim_matches('-');

    if trimmed.is_empty() {
        return "image".to_string();
    }

    trimmed.to_string()
}

fn push_separator(slug: &mut String, previous_was_separator: &mut bool) {
    if *previous_was_separator {
        return;
    }

    slug.push('-');
    *previous_was_separator = true;
}

#[cfg(test)]
mod tests {
    use super::create_slug_from_path_segment;

    #[test]
    fn creates_ascii_slugs() {
        assert_eq!(
            create_slug_from_path_segment("art fight 2026"),
            "art-fight-2026"
        );
        assert_eq!(
            create_slug_from_path_segment("Cafe\u{0301} & Tea"),
            "cafe-and-tea"
        );
        assert_eq!(create_slug_from_path_segment("---"), "image");
    }
}
