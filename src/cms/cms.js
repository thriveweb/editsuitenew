import React from 'react'
import CMS from 'netlify-cms'
import './cms-utils'

import { AboutPageTemplate } from '../templates/AboutPage'
import { BlogIndexTemplate } from '../templates/BlogIndex'
import { ContactPageTemplate } from '../templates/ContactPage'
import { HomePageTemplate } from '../templates/HomePage'
import { ProjectCategoryPageTemplate } from '../templates/ProjectCategoryPage'
import { ProjectPageTemplate } from '../templates/ProjectPage'
import { SinglePhotographyTemplate } from '../templates/SinglePhotography'
import { SinglePostTemplate } from '../templates/SinglePost'
import { SingleProjectTemplate } from '../templates/SingleProject'
import { SingleMotionGraphicsTemplate } from '../templates/SingleMotionGraphics'

if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem('netlifySiteURL') + 'styles.css'
  )
} else {
  CMS.registerPreviewStyle('/styles.css')
}

CMS.registerPreviewTemplate('about-page', ({ entry }) => (
  <AboutPageTemplate {...entry.toJS().data} isPreview />
))
CMS.registerPreviewTemplate('blog-page', ({ entry }) => (
  <BlogIndexTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
  <ContactPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('projectCategories', ({ entry }) => (
  <ProjectCategoryPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('work-page', ({ entry }) => (
  <ProjectPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('photography', ({ entry }) => (
  <SinglePhotographyTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('posts', ({ entry }) => (
  <SinglePostTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('projects', ({ entry }) => (
  <SingleProjectTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('motion-graphics', ({ entry }) => (
  <SingleMotionGraphicsTemplate {...entry.toJS().data} />
))
