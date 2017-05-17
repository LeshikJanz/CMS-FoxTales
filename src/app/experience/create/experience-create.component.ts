import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITag } from '../tag.interface';
import { ExperienceService } from '../experience.service';

@Component({
  selector: 'experience-create',
  templateUrl: './experience-create.component.html',
  styleUrls: [ './experience-create.component.scss' ]
})
export class ExperienceCreateComponent implements OnInit {
  /**
   * Experience form
   *
   * @type {FormGroup}
   */
  public experienceForm: FormGroup;

  /**
   * Tags
   *
   * @type {ITag[]}
   */
  public tags: ITag[];

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {FormBuilder} formBuilder
   * @param {ExperienceService} experience - Experience service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private experience: ExperienceService
  ) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this.getTags();
    this.buildExperienceForm()
  }

  /**
   * Get tags
   *
   * @returns {void}
   */
  public getTags(): void {
    this.experience
      .getTags()
      .subscribe((tags: ITag[]) => this.tags = tags);
  }

  /**
   * Tag transformer
   *
   * @param {string} tag - Tag
   * @returns {string} - Transformed tag
   */
  public tagTransformer(tag: string): string {
    return tag.replace(/\s/g, '');
  }

  /**
   * Add experience
   *
   * @param experience - Experience
   * @returns {void}
   */
  public addExperience(experience): void {
    experience.tags = experience.tags.map((tag: ITag) => tag.name);
    console.log(experience);
  }

  /**
   * Build user form
   *
   * @returns {UserCreateComponent} - Component
   */
  public buildExperienceForm(): ExperienceCreateComponent {
    this.experienceForm = this.formBuilder.group({
      tags: ['', [
        Validators.required
      ]]
    });

    return this;
  }
}
