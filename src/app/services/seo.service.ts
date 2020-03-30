import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  generateTags(config: SeoConfig = {}) {
    config.keywords
      ? (config.keywords = [...environment.keywords, ...config.keywords])
      : (config.keywords = environment.keywords);

    config = {
      title: environment.title,
      description: environment.description,
      image: this.absoluteImageUrl(environment.featureImage),
      route: '',
      ...config
    };

    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'keywords',
      content: config.keywords.join(', ')
    });

    this.twitterCard(config);
  }

  private twitterCard(config: SeoConfig) {
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image'
    });
    this.meta.updateTag({ name: 'twitter:site', content: '@notiz_dev' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: config.description
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: config.twitter_image || config.image
    });
  }

  private absoluteImageUrl(image: string) {
    return `${environment.url}/${image}`;
  }
}

export interface SeoConfig {
  title?: string;
  description?: string;
  image?: string;
  og_image?: string;
  twitter_image?: string;
  route?: string;
  keywords?: string[];
  article?: SeoArticle;
  author?: SeoProfile;
}

export interface SeoArticle {
  published_time: string;
  modified_time: string;
  tag: string[];
  author: string[];
}

export interface SeoProfile {
  first_name: string;
  last_name: string;
  username: string;
}
